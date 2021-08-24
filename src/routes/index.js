const router = require("express").Router();
const auth = require("./auth");
const cardPay = require("./cardPayments");
const profile = require("./profile");

router.use("/auth", auth );
router.use("/profile", profile);
router.use("/card-payment", cardPay);

module.exports = router;