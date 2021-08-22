const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const Profile = sequelize.define("users", {
	name: Sequelize.STRING,
	username: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING,
	picture: Sequelize.STRING,
	city: Sequelize.STRING,
	address: Sequelize.STRING,
	post_code: Sequelize.INTEGER,
});

module.exports = Profile;