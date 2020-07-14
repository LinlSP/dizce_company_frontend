const router = require("express").Router();

const free = require("./free/network");

router.use("/free", free);

module.exports = router;
