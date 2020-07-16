const bcrypt = require("bcrypt");
const saltRounds = 10;

const addUser = async (collection, user) => {
  const { nick, name, password, role, country } = user;
  try {
    const coincidences = await collection
      .find({ nick: nick }, { projection: { _id: 0, nick: 1 } })
      .toArray();
    if (coincidences.length > 0) {
      return Promise.reject({ error: "That nick already exists", status: 400 });
    }
    const hashedPsw = await bcrypt.hash(password, saltRounds);
    await collection.insertOne(
      {
        nick: nick,
        name: name,
        password: hashedPsw,
        role: role,
        country: country,
        createdAt: new Date(),
      },
      { writeConcern: 2 }
    );

    return "User added successfully";
  } catch (error) {
    console.log(error);
    return Promise.reject({});
  }
};

const getActive = async (collection) => {
  try {
    const activeUsers = await collection
      .find({}, { projection: { _id: 0, nick: 1, createdAt: 1, role: 1 } })
      .toArray();
    return activeUsers;
  } catch (error) {
    console.log(error);
    return Promise.reject({});
  }
};

const deleteUser = async (collection, nick) => {
  try {
    const { deletedCount } = await collection.deleteOne(
      { nick: nick },
      {
        justOne: true,
        writeConcern: 2,
      }
    );
    if (deletedCount === 0) {
      return Promise.reject({ error: "User not found", status: 400 });
    }
    return "User successfully deleted";
  } catch (error) {
    console.log(error);
    return Promise.reject({});
  }
};

module.exports = {
  add: addUser,
  active: getActive,
  delete: deleteUser,
};
