const destination = require("express").Router();
const destinationController = require("../controllers/destination");
const picture = require("../middlewares/uploads").single("picture");


destination.post("/", picture,  destinationController.createDestination);
destination.get("/", destinationController.SearchDestinations);


module.exports = destination;
