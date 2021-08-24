const productsFacilityModel = require("../models/productFacility");

exports.createProductFacility = async (req, res) => {
	try{
		const data = await productsFacilityModel.create(req.body);
		return res.json({
			success: true,
			message : "Facility of product created succesfully",
			results: data,
		});
	}catch(err){
		return res.json({
			success: false,
			message : "Facility of product created Failed",
			errors: err,
		});
	}
};