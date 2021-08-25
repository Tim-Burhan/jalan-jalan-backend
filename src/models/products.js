const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
// const productAirlineModel = require("./productAirline");
const airlineModel = require("./airline");
const destinationModel = require("./destination");
const classModel = require("./class");
const ProductFacility = require("./productFacility");

const Products = sequelize.define("products", {
	id_airline: Sequelize.INTEGER,
	id_destination: Sequelize.INTEGER,
	day: Sequelize.STRING,
	date: Sequelize.STRING,
	month: Sequelize.STRING,
	years: Sequelize.STRING,
	time_leave: Sequelize.STRING,
	time_arrive: Sequelize.STRING,
	transit: Sequelize.STRING,
	price: Sequelize.INTEGER,
	code: Sequelize.STRING,
	terminal: Sequelize.STRING,
	gate: Sequelize.STRING,
	id_class: Sequelize.INTEGER,
	deletedBy: Sequelize.TINYINT,
});

Products.belongsTo(airlineModel, {foreignKey: "id_airline", sourceKey: "id"});
Products.belongsTo(destinationModel, {foreignKey: "id_destination", sourceKey: "id"});
Products.belongsTo(classModel, {foreignKey: "id_class", sourceKey: "id"});
Products.belongsTo(ProductFacility, {foreignKey: "id", sourceKey: "productId"});
// Products.hasMany(ProductFacility);

module.exports = Products;