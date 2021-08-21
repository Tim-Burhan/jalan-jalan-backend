const authModel = require("../models/auth");
const {response: formResponse} = require("../helpers/formResponse");
const argon2 = require("argon2");

exports.register = async(req, res) => {
	try {
		const { name, email, password } = req.body;
		const hashPassword = await argon2.hash(password);
		const auth = await authModel.create({name: name, email: email, password: hashPassword});
		return formResponse(res, 200, "register success!", auth);
	} catch (error) {
		return formResponse(res, 400, "internal failure!", error);
	}

};

exports.login = async(req, res) => {
	const {email, password} = req.body;
	const auth = await authModel.findOne({where: {email: email}});
	console.log(`password dari db ${auth.password} ${password}`);
	if (auth === null) {
		return formResponse(res, 404, "user not found!");
	} else {
		try {
			const checkPass = await argon2.verify(auth.password, password);
			// console.log("kondisi dua: ", checkPass);
			if (checkPass) {
				return formResponse(res, 200, "login success!", { results: auth });
			} else {
				return formResponse(res, 400, "password does'n match!");
			}
		} catch (error) {
			return formResponse(res, 400, "internal failure!", error);
		}
	}
};