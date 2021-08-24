const destinationModel = require("../models/destination");
const {Op} = require("sequelize");
const {APP_UPLOADS_ROUTE} = process.env;

exports.createDestination = async (req, res) => {
	try{
		if(req.file){
			req.body.picture = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null;
			console.log(req.body.name);
			const resultsWithReqFile = await destinationModel.create(req.body);
			resultsWithReqFile.set({
				deletedBy: 0
			});
			await resultsWithReqFile.save();
			try{
				return res.json({
					success: true,
					message : "Destination with req file Created Succesfully",
					results: resultsWithReqFile,
				});
			}catch(err){
				return res.json({
					success: false,
					message : "Destination with req file Created failed",
					results: err,
				});
			}
		}else{
			const resultsNoReqFile = await destinationModel.create(req.body);
			resultsNoReqFile.set({
				deletedBy: 0
			});
			await resultsNoReqFile.save();
			return res.json({
				success: true,
				message : "Destination without req file Created Succesfully",
				results: resultsNoReqFile,
			});
		}
	}catch(err){
    console.log(err);
		return res.json({
			success: false,
			message : "Destination Created failed",
			err: err,
		});
	}
};

exports.SearchDestinations = async (req, res) => {
	const cond = req.query.search || "";
	try{
		const data = await destinationModel.findAll({
			where: {
				[Op.or]:[
					{city: {
						[Op.substring] : cond
					}},
					{country: {
						[Op.substring] : cond
					}},
				]
			},
		});
		return res.json({
			success: true,
			message: "List Destinations",
			results: data,
		});
	}catch(err){
		console.log(err);
		return res.json({
			success: false,
			message: "Destinations not found",
			err: err,
		});
	}
};
