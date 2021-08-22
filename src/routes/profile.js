const profile = require("express").Router();
const profileController = require("../controllers/profile");

profile.patch("/:id", profileController.updateUserProfile);
profile.get("/:id", profileController.getUserProfileById);
profile.delete("/:id", profileController.deleteUserProfile);
profile.get("/", profileController.getAllUserProfile);

module.exports = profile;