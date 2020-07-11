const bcrypt = require("bcrypt");
const saltRounds = 10;

async function addUser(collection, user) {
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
}

async function listUsers() {}

module.exports = {
  add: addUser,
  list: listUsers,
};
