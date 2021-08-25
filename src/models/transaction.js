const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const ProductModel = require("./products");
const UserModel = require("./profile");
const destinationModel = require("./destination");
const airlineModel = require("./airline");

const Transaction = sequelize.define("transactions", {
	productId: Sequelize.INTEGER,
	userId: Sequelize.INTEGER,
	status: Sequelize.TINYINT,
});

Transaction.belongsTo(ProductModel, {sourceKey: "id"});
Transaction.belongsTo(UserModel, { sourceKey: "id" });
Transaction.belongsTo(destinationModel, { sourceKey: "id" });
Transaction.belongsTo(airlineModel, { sourceKey: "id" });
module.exports = Transaction;