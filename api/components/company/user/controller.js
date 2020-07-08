const store = require("./store");

function addUser(collection, user) {
  if (user) {
  }
  return store.add(collection, user);
}

function listUsers() {
  return store.list();
}

module.exports = {
  addUser,
  listUsers,
};
