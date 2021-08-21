const auth = require("express").Router();
const authController = require("../controllers/auth");

auth.post("/", authController.register);
auth.get("/", authController.login);

module.exports = auth;