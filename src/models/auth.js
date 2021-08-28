const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize");

const Auth = sequelize.define("users", {
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
		allowNull: true,
		validate: {
			len: [5, 255]
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
	picture: Sequelize.STRING,
	city: Sequelize.STRING,
	address: Sequelize.STRING,
	post_code: Sequelize.INTEGER,
});

module.exports = Auth;