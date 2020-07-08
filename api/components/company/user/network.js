const router = require("express").Router();
const response = require("../../../network/response");
const controller = require("./controller");

router.post("/", (req, res) => {
  const { coCluster } = req.app.locals;
  collection = coCluster.db("Accounts").collection("Users");

  const user = req.body;

  controller
    .addUser(collection, user)
    .then((msg) => {
      response.success(req, res, msg, 200);
    })
    .catch((error) => {
      response.error(req, res, "Internal Error", 500, error);
    });
});

module.exports = router;
