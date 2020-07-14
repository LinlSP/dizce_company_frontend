const jwt = require("jsonwebtoken");
const response = require("../network/response");
const { jwtSecret } = require("../config");
const grantAccess = require("../network/roles");

module.exports = (required_permission = "") => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({ error: "No token was provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({ error: "No token was provided" });
    }

    jwt.verify(token, jwtSecret, (error, user) => {
      if (error) return response.error(req, res, "Token is not valid", 401);
      /////verify if user has right permissions
      const accesGrantedTo = grantAccess(user.role);
      if (!accesGrantedTo.includes(required_permission)) {
        return response.error(
          req,
          res,
          "You don't have access to execute this action",
          403
        );
      }
      req.user = user;
      next();
    });
  };
};
