const Sequelize = require("sequelize");
const {
	DB_HOST, DB_USER, DB_NAME, DB_PASS
} = process.env;


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
	host: DB_HOST,
	dialect: "mysql"
});

module.exports = sequelize;