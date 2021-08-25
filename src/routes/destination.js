const destination = require("express").Router();
const destinationController = require("../controllers/destination");
const picture = require("../middleware/uploads");


destination.post("/", picture,  destinationController.createDestination);
destination.get("/", destinationController.SearchDestinations);


module.exports = destination;
