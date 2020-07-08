const store = require("./store");

function addUser(collection, user) {
  const { nick, name, password, role, country } = user;
  const nickMinLength = 5;
  const nameMinLength = 6;
  const pswdMinLength = 8;
  if (!nick || !name || !password || !role || !country) {
    return Promise.reject("Fields are missing");
  }
  if (nick.length < nickMinLength) {
    return Promise.reject(`Nick has less than ${nickMinLength} characters`);
  }
  if (name.length < nameMinLength) {
    return Promise.reject(`Name has less than ${nameMinLength} characters`);
  }
  if (password.length < pswdMinLength) {
    return Promise.reject(`Name has less than ${pswdMinLength} characters`);
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
