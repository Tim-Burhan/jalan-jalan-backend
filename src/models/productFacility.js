const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Facility = require("./facility");
// const Products = require("./products");


const ProductFacility = sequelize.define("product_facilities", {
	productId: Sequelize.INTEGER,
	facilityId: Sequelize.INTEGER,
});

ProductFacility.belongsTo(Facility, {foreignKey: "facilityId", sourceKey: "id"});

module.exports = ProductFacility;