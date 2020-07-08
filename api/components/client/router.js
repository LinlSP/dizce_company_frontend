const router = require("express").Router();

const free = require("./free/network");
const store = require("./store/network");

router.use("/free", free);
router.use("/store", store);

module.exports = router;
