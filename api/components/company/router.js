const router = require("express").Router();

const login = require("./login/network");
const user = require("./user/network");

router.use("/login", login);
router.use("/user", user);

module.exports = router;
