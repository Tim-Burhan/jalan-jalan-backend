const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const Facility = sequelize.define("facilities", {
	name: Sequelize.STRING,
});

module.exports = Facility;