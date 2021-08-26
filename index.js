require("dotenv").config();
const express = require("express");
const sequelize = require("./src/config/sequelize");
const {APP_UPLOADS_ROUTE, APP_UPLOADS_PATH, APP_PORT} = process.env;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const rootRouter = require("./src/routes");
const server = require("http").createServer(app);
const socket = require("./src/middleware/socket");
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
	},
});


io.on("connection", () => {
	console.log("socket is connect");
});

app.use(cors());
app.use(socket(io));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(APP_UPLOADS_ROUTE, express.static(APP_UPLOADS_PATH));
app.use("/", rootRouter);

server.listen(APP_PORT, () => {
	console.log(`APP running on port: ${APP_PORT}`);
	sequelize.sync();
});

