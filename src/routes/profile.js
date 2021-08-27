const profile = require("express").Router();
const profileController = require("../controllers/profile");
const auth = require("../middleware/checkToken");
const uploads = require("../middleware/uploads");

profile.get("/detailUserAndCard", auth, profileController.getDetailUserViaCardPayment);
profile.get("/yourprofile", auth, profileController.detailUserProfile);
profile.put("/editprofile", auth, uploads ,profileController.updatePutProfile);
profile.patch("/:id", auth, uploads ,profileController.updateUserProfile);
profile.get("/:id", profileController.getUserProfileById);
profile.delete("/:id", profileController.deleteUserProfile);
profile.get("/", profileController.getAllUserProfile);

module.exports = profile;