const router = require("express").Router();
const productRouter = require("./products");
const airlineRouter = require("./airline");
const destinationRouter = require("./destination");
const classRouter = require("./class");
const facilityRouter = require("./facility");
const productFacilityRouter = require("./productFacility")

router.use("/products", productRouter);
router.use("/airline", airlineRouter);
router.use("/destination", destinationRouter);
router.use("/class", classRouter);
router.use("/facility", facilityRouter);
router.use("/productfacility", productFacilityRouter);

module.exports = router;