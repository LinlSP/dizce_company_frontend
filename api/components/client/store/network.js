const router = require("express").Router();
const requiredPermission = "CLIENTSTORE";
router.get("/", function (req, res) {
  const { cliCluster } = req.app.locals;
  cliCluster.db("Products").collection("Animal").insertOne({
    product: "meat",
    currency: "USD",
    price: 18,
  });
  res.send("This is your store");
});

module.exports = router;
