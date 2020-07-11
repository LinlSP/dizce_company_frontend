const router = require("express").Router();
const response = require("../../../network/response");
const controller = require("./controller");
const authenticate = require("../../../middlewares/authenticate");

const permission = "ADDUSER";
router.post("/", authenticate(permission), (req, res) => {
  const { coCluster } = req.app.locals;
  collection = coCluster.db("Accounts").collection("Users");

  const user = req.body;

  controller
    .addUser(collection, user)
    .then((msg) => {
      response.success(req, res, msg, 200);
    })
    .catch(({ error, status }) => {
      response.error(req, res, error, status);
    });
});

module.exports = router;
