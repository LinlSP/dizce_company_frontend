const router = require("express").Router();
const response = require("../../../network/response");
const controller = require("./controller");
const authenticate = require("../../../middlewares/authenticate");

const permissions = {
  add: "ADDUSER",
  active: "ACTIVEUSER",
  delete: "DELETEUSER",
};

router.post("/add", authenticate(permissions.add), (req, res) => {
  const { coCluster } = req.app.locals;
  const collection = coCluster.db("Accounts").collection("Users");

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

router.get("/active", authenticate(permissions.active), (req, res) => {
  const { coCluster } = req.app.locals;
  const collection = coCluster.db("Accounts").collection("Sessions");

  controller
    .getActive(collection)
    .then((msg) => {
      response.success(req, res, msg, 200);
    })
    .catch(({ error, status }) => {
      response.error(req, res, error, status);
    });
});

router.delete("/delete", authenticate(permissions.delete), (req, res) => {
  const { coCluster } = req.app.locals;
  const collection = coCluster.db("Accounts").collection("Users");

  const { nick } = req.query;

  controller
    .deleteUser(collection, nick)
    .then((msg) => {
      response.success(req, res, msg, 200);
    })
    .catch(({ error, status }) => {
      response.error(req, res, error, status);
    });
});

module.exports = router;
