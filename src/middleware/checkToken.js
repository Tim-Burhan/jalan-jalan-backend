const jwt = require("jsonwebtoken");
const {APP_SECRET_KEY} = process.env;
const {response:formResponse} = require("../helpers/formResponse");

const auth = (req, res, next) => {
	console.log(req.headers);
	if(req.headers.authorization) {
		if(req.headers.authorization.startsWith("Bearer")) {
			try {
				const token = req.headers.authorization.slice(7);
				const user = jwt.verify(token, APP_SECRET_KEY);
				req.authUser = user;
				console.log(user);
				next();
			} catch (error) {
				return formResponse(res, 401, "Session expired, please login!");
			}
		}
	} else {
		return formResponse(res, 401, "Token needed!");
	}
};

module.exports = auth;