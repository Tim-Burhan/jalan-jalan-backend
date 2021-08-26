const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");
const Profile = require("./profile");

const Chat = sequelize.define("chats", {
	message: Sequelize.STRING,
	sender: Sequelize.INTEGER,
	recipient: Sequelize.INTEGER,
	isLatest: Sequelize.BOOLEAN,
	attachFile: {
		type: Sequelize.STRING,
		allowNull: true,
	},
});

Chat.belongsTo(Profile, { foreignKey: "recipient", sourceKey: "id" });

module.exports = Chat;