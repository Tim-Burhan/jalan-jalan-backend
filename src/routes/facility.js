const routefacility = require("express").Router();
const facilityController = require("../controllers/facility");


routefacility.post("/",  facilityController.createFacility);


module.exports = routefacility;
