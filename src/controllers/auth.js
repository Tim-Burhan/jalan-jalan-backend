const authModel = require("../models/auth");
const {response: formResponse} = require("../helpers/formResponse");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const {APP_SECRET_KEY, APP_USER_MAIL, APP_USER_PASS} = process.env;
const profileModel = require("../models/profile");
const nodemailer = require("nodemailer");

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
				return formResponse(res, 200, "login success!", {token});
			} else {
				return formResponse(res, 400, "password does'n match!");
			}
		} catch (error) {
			return formResponse(res, 400, "internal failure!", error);
		}
	}
};

exports.forgotPassword = async (req, res) => {
	const {email} = req.body;
	const checkEmail = await profileModel.findOne({
		where: {
			email: email
		}
	});
	if (checkEmail === null) {
		return formResponse(res, 404, "email not found!");
	} else {
		const tokenForgot = jwt.sign({
			id: checkEmail.id,
			email: checkEmail.email
		}, APP_SECRET_KEY, {
			expiresIn: "2h"
		});
		let transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 578,
			secure: false,
			auth: {
				user: APP_USER_MAIL,
				pass: APP_USER_PASS
			}
		});

		let mailOptions = {
			from: "<noreply@gmail.com>",
			to: req.body.email,
			subject: "Generate Link for Reset Password from BravoTeam",
			html: ` <h3> Link  to Reset Password </h3>
              <p> Hello, this is your link: ${process.env.APP_URL}/auth/reset-password/${tokenForgot} </p>`
		};
		transporter.sendMail(mailOptions, (err) => {
			if (err) {
				console.log("Its Error: ", err);
			} else {
				console.log("Sent Success!!!!");
			}
		});
		return formResponse(res, 200, "Your link has been send!", mailOptions);
	}
};

// exports.getDirectLink = async (req,res) => {
// 	const {token} = req.params;
// 	const auth = await profileModel.findOne();
// };
// exports.resetPassword = async (req, res) => {

// };