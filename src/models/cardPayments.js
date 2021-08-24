const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const profileModel = require("./profile");
const CardPayments = sequelize.define("card_payments", {
	nameCard: Sequelize.STRING,
	number: Sequelize.STRING,
	balance: Sequelize.INTEGER,
	userId: Sequelize.INTEGER
});

CardPayments.belongsTo(profileModel, {sourceKey: "id"});
module.exports = CardPayments;