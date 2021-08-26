const auth = require("express").Router();
const authController = require("../controllers/auth");

auth.post("/register", authController.register);
auth.post("/login", authController.login);
auth.post("/forgot-password", authController.forgotPassword);
auth.patch("/reset-password/:token", authController.resetPassword);
auth.get("/reset-password/:token", authController.getDirectLink);

module.exports = auth;