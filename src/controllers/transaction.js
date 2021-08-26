const transactionModel = require("../models/transaction");
const productModel = require("../models/products");
const { Op } = require("sequelize");
const { response: formResponse } = require("../helpers/formResponse");
const Destination = require("../models/destination");
const Airline = require("../models/airline");
const Class = require("../models/class");

exports.createTransaction = async (req, res) => {
	const {id} = req.authUser;
	const setData = req.body;
	setData.status = 0;
	setData.deletedBy = 0;
	setData.userId = id;
	try {
		const trx = await transactionModel.create(setData);
		return formResponse(res, 200, "create transaction successfully!", trx);
	} catch (error) {
		return formResponse(res, 400, "create transaction is failure!", error);
	}
};

exports.getTransaction = async (req, res) => {
	const {id} = req.authUser;
	try {
		const trxAll = await transactionModel.findAll({
			where: {
				userId: id,
				deletedBy: 0
			},
			include: [
				{
					model: productModel,
					as: "product",
					include: [Destination, Airline],
				}
			],
			attributes: {
				exclude: ["destinationId", "airlineId", "createdAt", "updatedAt"]
			}
		});
		return formResponse(res, 200, "List all user transactions!", trxAll);
    
	} catch (error) {
		return formResponse(res, 500, "Something wrong an error occured!", error);
	}
};

exports.paymentProcess = async (req, res) => {
	const setData = req.body;
	const {id} = req.params;
	setData.status = 1;
	try {
		const getTrxId = await transactionModel.findByPk(id);
		if(getTrxId === null) {
			return formResponse(res, 404, "id transaction not found!");
		} else {
			const trx = await transactionModel.update(setData, {
				where: {
					id: id
				}
			});
			if(getTrxId.status === 1) {
				return formResponse(res, 400, "isPaid!");
			} else {
				return formResponse(res, 200, "Payment success!", trx);
			}
		}
	} catch (error) {
		return formResponse(res, 500, "An error occured!", error);
	}
};

exports.getDetailTransaction = async (req,res) => {
	const {id} = req.params;
	try {
		const trxDetail = await transactionModel.findAll({
			where: {
				id: { [Op.substring]: id }
			},
			include: [
				{
					model: productModel,
					as: "product",
					include: [Destination, Airline, Class],
				}
			],
			attributes: {
				exclude: ["destinationId", "airlineId" ,"createdAt", "updatedAt"]
			}
		});
		if (trxDetail.id === null) {
			return formResponse(res, 404, "Id transaction not found!");
		} else {
			return formResponse(res, 200, "Detail Transaction!", trxDetail);
		}
	} catch (error) {
		return formResponse(res, 500, "An error occured!", error);
	}
};

exports.deletedTransactionBy = async (req, res) => {
	const {id} = req.params;
	const setData = req.body;
	setData.deletedBy = 1;
	try {
		const getTrxId = await transactionModel.findByPk(id);
		if (getTrxId === null) {
			return formResponse(res, 404, "Id transaction not found!");
		} else {
			const deletedTrx = await transactionModel.update(setData, {
				where: {
					id: id
				}
			});
			if (deletedTrx.deletedBy === 1) {
				return formResponse(res, 400, "isDeleted!");
			} else {
				return formResponse(res, 200, "Deleted success!", deletedTrx);
			}
		}
	} catch (error) {
		return formResponse(res, 500, "Something wrong!!");
	}
};