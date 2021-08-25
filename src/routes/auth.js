const auth = require("express").Router();
const authController = require("../controllers/auth");

auth.post("/register", authController.register);
auth.post("/login", authController.login);
auth.post("/forgot-password", authController.forgotPassword);
auth.patch("/reset-password", authController.forgotPassword);
module.exports = auth;