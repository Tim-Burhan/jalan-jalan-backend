const profileModel = require("../models/profile");
const { response: formResponse } = require("../helpers/formResponse");

exports.getAllUserProfile = async (req, res) => {
	const profile = await profileModel.findAll();
	return formResponse(res, 200, "List All users: ", profile);
};

exports.updateUserProfile = async (req, res) => {
	const {id} = req.params;
	const profile = await profileModel.findByPk(id);
	if(profile === null) {
		return formResponse(res, 404, "User profile not found!");
	} else {
		profile.set(req.body);
		await profile.save();
		return formResponse(res, 200, "Updated successfully! ", profile);
	}
};

exports.getUserProfileById = async (req, res) => {
	const {id} = req.params;
	const user = await profileModel.findByPk(id);
	if (user === null) {
		return formResponse(res, 404, "User profile not found!");
	} else {
		return formResponse(res, 200, "Updated successfully! ", user);
	}
};

exports.deleteUserProfile = async (req, res) => {
	const {id} = req.params;
	const user = await profileModel.findByPk(id);
	if (user === null) {
		return formResponse(res, 404, "User profile not found!");
	} else {
		await user.destroy();
		return formResponse(res, 200, "Delete user successfully! ", user);
	}
};