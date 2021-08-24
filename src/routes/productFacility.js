const productfacility = require("express").Router();
const productfacilityController = require("../controllers/productFacility");


productfacility.post("/",  productfacilityController.createProductFacility);


module.exports = productfacility;
