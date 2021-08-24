const facilityModel = require("../models/facility");

exports.createFacility = async (req, res) => {
	try{
		const data = await facilityModel.create(req.body);
		return res.json({
			success: true,
			message : "Facility created succesfully",
			results: data,
		});
	}catch(err){
		return res.json({
			success: false,
			message : "Facility created Failed",
			errors: err,
		});
	}
};