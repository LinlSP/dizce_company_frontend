const router = require("express").Router();
router.get("/", function (req, res) {
  const { cliCluster } = req.app.locals;
  // cliCluster.db("Accounts").collection("Workers").insertOne({
  //   name: "lincolsito",
  //   age: 18,
  // });
  res.send("This is free");
});

module.exports = router;
