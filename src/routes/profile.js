const profile = require("express").Router();
const profileController = require("../controllers/profile");
const auth = require("../middleware/checkToken");
const uploads = require("../middleware/uploads");

profile.patch("/", auth, uploads ,profileController.updateUserProfile);
profile.get("/your-profile", auth, profileController.getUserProfileById);
profile.delete("/:id", profileController.deleteUserProfile);
profile.get("/", profileController.getAllUserProfile);

module.exports = profile;