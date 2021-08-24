const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const Class = sequelize.define("class", {
	name: Sequelize.STRING,
	add_price: Sequelize.INTEGER,
});

module.exports = Class;