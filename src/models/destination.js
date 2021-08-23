const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const productModel = require("./products");

const Destination = sequelize.define("destinations", {
	picture: Sequelize.STRING,
	destination_country: Sequelize.STRING,
	destination_country_code: Sequelize.STRING,
	destination_city: Sequelize.STRING,
	base_country: Sequelize.STRING,
	base_country_code: Sequelize.STRING,
	base_city: Sequelize.STRING,
});

// Destination.belongsTo(productModel, {foreignKey: "id", sourceKey: "id_destination" });

module.exports = Destination;