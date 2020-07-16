const router = require("express").Router();
const response = require("../../../network/response");
const { login } = require("./controller");
const authenticate = require("./loginAuth");

router.post("/", authenticate, (req, res) => {
  const { coCluster } = req.app.locals;
  collection = coCluster.db("Accounts").collection("Users");

  const credentials = req.body;

  login(req, collection, credentials)
    .then((msg) => {
      response.success(req, res, msg, 200);
    })
    .catch(({ error, status }) => {
      response.error(req, res, error, status);
    });
});

module.exports = router;
