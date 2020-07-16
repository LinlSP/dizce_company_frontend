const jwt = require("jsonwebtoken");
const response = require("../../../network/response");
const { jwtSecret } = require("../../../config");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next();
  }
  const { coCluster } = req.app.locals;
  collection = coCluster.db("Accounts").collection("Sessions");

  jwt.verify(token, jwtSecret, (error, user) => {
    if (error)
      return response.error(req, res, "Token is corrupted or has expired", 401);
    const { role, nick } = user;
    (async () => {
      const dbToken = await collection.findOne(
        { nick: nick },
        { projection: { _id: 0, jwt: 1 } }
      );
      if (dbToken) {
        const storedToken = dbToken.jwt;
        if (storedToken !== token) {
          return response.error(
            req,
            res,
            "This user has already initiated a session in a different device",
            401
          );
        }
        return response.success(req, res, role, 200);
      }
      return response.error(req, res, "No jwt in DB", 401);
    })();
  });
};
