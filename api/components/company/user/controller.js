const store = require("./store");

const addUser = (collection, user) => {
  const { nick, name, password, role, country } = user;
  const nickMinLength = 5;
  const nameMinLength = 6;
  const pswdMinLength = 8;
  if (!nick || !name || !password || !role || !country) {
    return Promise.reject({ error: "Fields are missing", status: 400 });
  }
  if (nick.length < nickMinLength) {
    return Promise.reject({
      error: `Nick has less than ${nickMinLength} characters`,
      status: 400,
    });
  }
  if (name.length < nameMinLength) {
    return Promise.reject({
      error: `Name has less than ${nameMinLength} characters`,
      status: 400,
    });
  }
  if (password.length < pswdMinLength) {
    return Promise.reject({
      error: `Password has less than ${pswdMinLength} characters`,
      status: 400,
    });
  }
  return store.add(collection, user);
};

const listUsers = () => {
  return store.list();
};

module.exports = {
  addUser,
  listUsers,
};
