const router = require("express").Router();
const auth = require("./auth");
const profile = require("./profile");

router.use("/auth", auth );
router.use("/profile", profile);

module.exports = router;