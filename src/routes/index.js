const router = require("express").Router();
const productRouter = require("./products");
const airlineRouter = require("./airline");
const destinationRouter = require("./destination");
const classRouter = require("./class");
const facilityRouter = require("./facility");
const productFacilityRouter = require("./productFacility");
const auth = require("./auth");
const cardPay = require("./cardPayments");
const profile = require("./profile");
const transaction = require("./transaction");
const chat = require("./chat");

router.use("/chats", chat);
router.use("/products", productRouter);
router.use("/airline", airlineRouter);
router.use("/destination", destinationRouter);
router.use("/class", classRouter);
router.use("/facility", facilityRouter);
router.use("/productfacility", productFacilityRouter);
router.use("/auth", auth );
router.use("/profile", profile);
router.use("/card-payment", cardPay);
router.use("/transaction", transaction);


module.exports = router;