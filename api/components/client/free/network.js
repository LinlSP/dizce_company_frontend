const router = require("express").Router();
const response = require("../../../network/response");
const controller = require("./controller");
const authenticate = require("../../../middlewares/authenticate");

const permissions = {
  add: "ADDFREE",
  get: "GETFREE",
  update: "UPDATEFREE",
  delete: "DELETEFREE",
};

router.post("/add", authenticate(permissions.add), (req, res) => {
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

router.get("/get", authenticate(permissions.get), (req, res) => {
  const { cliCluster } = req.app.locals;
  const collection = cliCluster.db("Free").collection("Websites");
  const { name } = req.query;

  controller
    .getSite(collection, name)
    .then((msg) => {
      response.success(req, res, msg, 201);
    })
    .catch(({ error, status }) => {
      response.error(req, res, error, status);
    });
});

router.put("/update", authenticate(permissions.update), (req, res) => {
  const { cliCluster } = req.app.locals;
  const collection = cliCluster.db("Free").collection("Websites");
  const user = req.user;
  const site = req.body;

  controller
    .updateSite(collection, user, site)
    .then((msg) => {
      response.success(req, res, msg, 201);
    })
    .catch(({ error, status }) => {
      response.error(req, res, error, status);
    });
});

router.delete("/delete", authenticate(permissions.delete), (req, res) => {
  const { cliCluster } = req.app.locals;
  const collection = cliCluster.db("Free").collection("Websites");
  const { name, language } = req.query;

  controller
    .deleteSite(collection, name, language)
    .then((msg) => {
      response.success(req, res, msg, 201);
    })
    .catch(({ error, status }) => {
      response.error(req, res, error, status);
    });
});

module.exports = router;
