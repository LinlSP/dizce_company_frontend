const router = require("express").Router();
const response = require("../../../network/response");
const controller = require("./controller");
const authenticate = require("../../../middlewares/authenticate");

const permissions = {
  add: "ADDFREE",
};

router.post("/add", authenticate(permissions.add), function (req, res) {
  const { cliCluster } = req.app.locals;
  const collection = cliCluster.db("Free").collection("Websites");
  const user = req.user;
  const site = req.body;

  controller
    .addSite(collection, user, site)
    .then((msg) => {
      response.success(req, res, msg, 201);
    })
    .catch(({ error, status }) => {
      response.error(req, res, error, status);
    });
});

module.exports = router;
