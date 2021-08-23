const classModel = require("../models/class");

exports.createClass = async (req, res) => {
	try{
		const data = await classModel.create(req.body);
		return res.json({
			success: true,
			message : "Class of product created succesfully",
			results: data,
		});
	}catch(err){
		return res.json({
			success: false,
			message : "Class of product created Failed",
			errors: err,
		});
	}
};