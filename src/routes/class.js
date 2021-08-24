const routeclass = require("express").Router();
const classController = require("../controllers/class");


routeclass.post("/",  classController.createClass);


module.exports = routeclass;
