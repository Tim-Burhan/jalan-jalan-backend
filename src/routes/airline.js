const airline = require("express").Router();
const airlineController = require("../controllers/airline");
const picture = require("../middleware/uploads");


airline.post("/", picture,  airlineController.createAirline);
airline.put("/update/:id", picture, airlineController.UpdateAirline);
airline.put("/:id", airlineController.deleteAirline);
airline.get("/",  airlineController.SearchAirline);


module.exports = airline;
