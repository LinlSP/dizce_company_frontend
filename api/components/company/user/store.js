const bcrypt = require("bcrypt");
const saltRounds = 10;

function addUser(collection, user) {
  const hashedPsw = bcrypt.hash(password, saltRounds);
  collection.insertOne(
    {
      nick: nick,
      password: hashedPsw,
      role: role,
      country: country,
      creationAt: new Date(),
    },
    { writeConcern: 2 }
  );
}

function listUsers() {}

module.exports = {
  add: addUser,
  list: listUsers,
};
