const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

async function addUser(collection, user) {
  const { nick, name, password, role, country } = user;
  try {
    const hashedPsw = await bcrypt.hash(password, saltRounds);
    await collection.insertOne(
      {
        nick: nick,
        name: name,
        password: hashedPsw,
        role: role,
        country: country,
        creationAt: new Date(),
      },
      { writeConcern: 2 }
    );
    return "User added successfully";
  } catch (error) {
    Promise.reject(error);
  }
}

async function listUsers() {}

module.exports = {
  add: addUser,
  list: listUsers,
};
