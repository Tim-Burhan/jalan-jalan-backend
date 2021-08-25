const airlineModel = require("../models/airline");
const {Op} = require("sequelize");
const {APP_UPLOADS_ROUTE} = process.env;

exports.createAirline = async (req, res) => {
	try{
		if(req.file){
			req.body.picture = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null;
			const resultsWithReqFile = await airlineModel.create(req.body);
			resultsWithReqFile.set({
				deletedBy: 0
			});
			await resultsWithReqFile.save();
			try{
				return res.json({
					success: true,
					message : "Airline with req file Created Succesfully",
					results: resultsWithReqFile,
				});
			}catch(err){
				return res.json({
					success: false,
					message : "Airline with req file Created failed",
					results: err,
				});
			}
		}else{
			const resultsNoReqFile = await airlineModel.create(req.body);
			resultsNoReqFile.set({
				deletedBy: 0
			});
			await resultsNoReqFile.save();
			return res.json({
				success: true,
				message : "Airline without req file Created Succesfully",
				results: resultsNoReqFile,
			});
		}
	}catch(err){
		return res.json({
			success: false,
			message : "Airline Created failed",
			err: err,
		});
	}
};

exports.SearchAirline = async (req, res) => {
	const cond = req.query.search || "";
	try{
		const data = await airlineModel.findAll({
			where: {
				name: {
					[Op.substring] : cond,
				},
				deletedBy: 0,
			},
		});
		return res.json({
			success: true,
			message: "List of Airline",
			results: data,
		});
	}catch(err){
		console.log(err);
		return res.json({
			success: false,
			message: "Airline not found",
			err: err,
		});
	}
};


exports.deleteAirline = async (req, res) => {
	const {id} = req.params;
	try{
		const data = await airlineModel.findOne({
			where: {
				id: id,
				deletedBy: 0
			}
		});
		data.set({
			deletedBy: 1
		});
		await data.save();
		return res.json({
			success: true,
			message: "deleted Airline succesfully",
			results: data,
		});
	}catch(err){
		return res.json({
			success: false,
			message: "deleted Airline failed",
			err: err,
		});
	}
};

exports.UpdateAirline = async (req, res) => {
	const {id} = req.params;
	if(req.file){
		req.body.picture = req.file ? `${APP_UPLOADS_ROUTE}/${req.file.filename}` : null;
		const data = await airlineModel.findOne({
			where: {
				id: id,
				deletedBy: 0
			}
		});
		data.set(req.body);
		await data.save();
		try{
			return res.json({
				success: true,
				message : "Updated Airline With req file succesfully",
				results: data,
			});
		}catch(err){
			return res.json({
				success: false,
				message : "Updated Airline With req file Failed",
				errors: err,
			});
		}
	}else{
		const data = await airlineModel.findOne({
			where: {
				id: id,
				deletedBy: 0
			}
		});
		data.set(req.body);
		await data.save();
		try{
			return res.json({
				success: true,
				message: "Updated Airline Without req file succesfully",
				results: data,
			});
		}catch(err){
			return res.json({
				success: false,
				message: "Updated Airline Without req file Failed",
				errors: err,
			});
		}
	}
};
