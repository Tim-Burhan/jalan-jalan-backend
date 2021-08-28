const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const Profile = sequelize.define("users", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notNull: {
				msg: "Please enter your name!"
			}
		}
	},
	username: {
		type: Sequelize.STRING,
		validate: {
			len: [5, 15]
		}
	},
	password: {
		type: Sequelize.STRING,
		validate: {
			len: [5, 10]
		}
	},
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: {
				msg: "Please enter your valid email!"
			}
		}
	},
	phoneNumber: Sequelize.STRING,
	picture: Sequelize.STRING,
	city: Sequelize.STRING,
	address: Sequelize.STRING,
	post_code: Sequelize.INTEGER,
});

module.exports = Profile;