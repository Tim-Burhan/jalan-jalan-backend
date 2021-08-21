require("dotenv").config();
const express = require("express");
const sequelize = require("./src/config/sequelize");
const {APP_PORT} = process.env;
const app = express();
const rootRouter = require("./src/routes");

app.use(express.urlencoded({extended: false}));

app.use("/", rootRouter);

app.listen(APP_PORT, () => {
	console.log(`APP running on port: ${APP_PORT}`);
	sequelize.sync();
});

