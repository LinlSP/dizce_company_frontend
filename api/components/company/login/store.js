const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../../config");

async function login(req, collection, { nick, password }) {
  try {
    const userDocument = await collection.findOne(
      { nick: nick },
      { projection: { _id: 0, password: 1, role: 1 } }
    );
    if (userDocument === null) {
      return Promise.reject({ error: "User not found", status: 400 });
    }
    ////////////////
    const hashedPsw = userDocument.password;
    const correctPsw = await bcrypt.compare(password, hashedPsw);
    if (!correctPsw) {
      return Promise.reject({ error: "Password doesn't match", status: 400 });
    }
    ///////////////
    const sessionCol = req.app.locals.coCluster
      .db("Accounts")
      .collection("Sessions");

    const previousSession = await sessionCol.findOne({ nick: nick });
    if (previousSession !== null) {
      await sessionCol.deleteOne({ nick: nick });
    }
    //////////////// GENERATE JWT's
    const { role } = userDocument;
    const user = { nick: nick, role: role };
    const accesToken = jwt.sign(user, jwtSecret, { expiresIn: "2h" });

    await sessionCol.insertOne({
      nick: nick,
      role: role,
      jwt: accesToken,
      createdAt: new Date(),
    });

    return { accesToken: accesToken, role: role };
  } catch (error) {
    console.log(error);
    return Promise.reject({});
  }
}

module.exports = {
  signup: login,
};
