const authModel = require("../models/auth");
const {response: formResponse} = require("../helpers/formResponse");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const {APP_SECRET_KEY} = process.env;


exports.register = async(req, res) => {
	const { name, email, password } = req.body;
	try {
		const checkEmail = await authModel.findOne({ where: { email: email } });
		if(checkEmail !== null) {
			return formResponse(res, 401, "Email alredy exists!", null);
		} else {
			const hashPassword = await argon2.hash(password);
			const auth = await authModel.create({ name: name, email: email, password: hashPassword });
			return formResponse(res, 200, "register success!", auth);
		}
	} catch (error) {
		return formResponse(res, 400, "internal failure!", error);
	}
};

exports.login = async(req, res) => {
	const {email, password} = req.body;
	const auth = await authModel.findOne({where: {email: email}});
	// console.log(`password dari db ${auth.password} ${password}`);
	if (auth === null) {
		return formResponse(res, 404, "user not found!");
	} else {
		try {
			const checkPass = await argon2.verify(auth.password, password);
			// console.log("kondisi dua: ", checkPass);
			if (checkPass) {
				const token = jwt.sign({id:auth.id, email: auth.email}, APP_SECRET_KEY, {expiresIn: "2h"});
				return formResponse(res, 200, "login success!", token);
			} else {
				return formResponse(res, 400, "password does'n match!");
			}
		} catch (error) {
			return formResponse(res, 400, "internal failure!", error);
		}
	}
};