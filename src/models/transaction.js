const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const ProductModel = require("./products");
const UserModel = require("./profile");

const Transaction = sequelize.define("transactions", {
	productId: Sequelize.INTEGER,
	userId: Sequelize.INTEGER,
	status: Sequelize.TINYINT,
	deletedBy: Sequelize.TINYINT,
});

Transaction.belongsTo(ProductModel, {sourceKey: "id"});
Transaction.belongsTo(UserModel, { sourceKey: "id" });
module.exports = Transaction;