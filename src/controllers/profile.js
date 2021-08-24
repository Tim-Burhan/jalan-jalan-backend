const profileModel = require("../models/profile");
const { response: formResponse } = require("../helpers/formResponse");
const { APP_URL, APP_UPLOADS_ROUTE } = process.env;

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
		if (req.file) {
			req.body.picture = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null;
			profile.set(req.body);
			await profile.save();
			if (profile.picture !== null && !profile.picture.startsWith("http")) {
				profile.picture = `${APP_URL}${profile.picture}`;
			}
			return formResponse(res, 200, "upload successfully!", profile);
		} else {
			profile.set(req.body);
			await profile.save();
			if (profile.picture !== null &&! profile.picture.startsWith("http")) {
				profile.picture = `${APP_URL}${profile.picture}`;
			}
			return formResponse(res, 200, "upload successfully!", profile);
		}
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

// Formidable

// const newPath = path.join(process.cwd(),"assets","images", `${Date.now()}-`);
// const maxFileSize = 2*1024*1024;
// const form = new formidable.IncomingForm({ multiples: true, maxFileSize: maxFileSize, uploadDir: newPath});
// console.log("form uplooad: ", form);
// form.parse(req); 
// form.on("fileBegin", (name, file) => {
// 	file.path = newPath + file.name;
// 	console.log("fileBegin: ",file.path);
// });

// await form.on("file", (name, file) => {
// 	try {
// 		profile.update({ picture: req.body });
// 		profile.save();

// 		console.log("Uploaded " + file.name);
// 		return formResponse(res, 200, "upload successfully!", profile);
// 	} catch (error) {
// 		console.log(error);
// 	}
// });