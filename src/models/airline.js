const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const productModel = require("./products");

const Airline = sequelize.define("airlines", {
	name: Sequelize.STRING,
	picture: Sequelize.STRING,
	extra_price: Sequelize.INTEGER,
  deletedBy: Sequelize.TINYINT,
});


module.exports = Airline;