const { signup } = require("./store");

function login(req, collection, credentials) {
  const { nick, password } = credentials;
  if (!nick || !password) {
    return Promise.reject({ error: "Fields are missing", status: 400 });
  }
  return signup(req, collection, credentials);
}

module.exports = { login };
