require("dotenv").config();
const express = require("express");
const sequelize = require("./src/config/sequelize");
const app = express();
const rootRouter = require("./src/routes");
const bodyParser = require("body-parser");
const { APP_UPLOADS_ROUTE, APP_UPLOADS_PATH, APP_PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(APP_UPLOADS_ROUTE, express.static(APP_UPLOADS_PATH));
app.use("/", rootRouter);

app.listen(APP_PORT, () => {
	console.log(`APP running on port: ${APP_PORT}`);
	sequelize.sync();
});

