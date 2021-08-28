const profileModel = require("../models/profile");
const CardPaymentsModel = require("../models/cardPayments");
const { response: formResponse } = require("../helpers/formResponse");
const { APP_URL, APP_UPLOADS_ROUTE } = process.env;

exports.getAllUserProfile = async (req, res) => {
	const profile = await profileModel.findAll();
	return formResponse(res, 200, "List All users: ", profile);
};

exports.updateUserProfile = async (req, res) => {
	const {id} = req.authUser;
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
	try {
		if (user === null) {
			return formResponse(res, 404, "User profile not found!");
		} else {
			return formResponse(res, 200, `Get user id: ${id} successfully!`, user);
		}
	} catch (error) {
		return formResponse(res, 200, "An error occured!", user);
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


exports.detailUserProfile = async (req, res) => {
	console.log("ini authUser id", req.authUser.id);
	const user = await profileModel.findByPk(req.authUser.id);
	try{
		const finaldata = {
			id: user.id,
			name: user.name,
			username: user.username,
			email: user.email,
			picture: user.picture,
			city: user.city,
			phoneNumber: user.phoneNumber,
			address: user.address,
			post_code: user.post_code
		};
		return res.json({
			success: true,
			message: "detail user",
			results: finaldata
		});
	}catch(err){
		return res.json({
			success: false,
			message: "ann errors occured",
			erorrs: err
		});
	}
};

exports.updatePutProfile = async (req, res) => {
	const user = await profileModel.findByPk(req.authUser.id);
	if(user){
		if(req.file){
			req.body.picture = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null;
			user.set(req.body);
			await user.save();
			const finaldata = {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
				picture: user.picture,
				city: user.city,
				address: user.address,
				post_code: user.post_code
			};
			return res.json({
				success: true,
				message: "User is Updated with req file Successfully",
				results: finaldata
			});
		}else{
			user.set(req.body);
			await user.save();
			console.log(req.body);
			const finaldata = {
				id: user.id,
				name: user.name,
				username: user.username,
				email: user.email,
				picture: user.picture,
				city: user.city,
				address: user.address,
				post_code: user.post_code
			};
			return res.status(200).json({
				success: true,
				Message: "User is Updated without req file Successfully",
				results: finaldata
			});
		}
	}else{
		return res.status(400).json({
			success: false,
			Message: "You must be login first"
		});
	}
};

exports.getDetailUserViaCardPayment = async (req, res) => {
	try{
		const card = await CardPaymentsModel.findOne({
			where: {
				userId: req.authUser.id,
			},
			include: [{
				model: profileModel,
				as: "user", 
				attributes: {
					exclude: ["createdAt", "updatedAt", "password"]
				}  
			}],
			attributes: {
				exclude: ["createdAt", "updatedAt"]
			} 
		});
		return res.status(200).json({
			success: true,
			Message: "User Profile",
			results: card
		});
	}catch(err){
		console.log(err);
		return res.status(200).json({
			success: false,
			Message: "ann errors occured",
			errors: err
		});
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