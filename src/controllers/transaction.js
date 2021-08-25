const transactionModel = require("../models/transaction");
const productModel = require("../models/products");
const { Op } = require("sequelize");
const { response: formResponse } = require("../helpers/formResponse");
const Destination = require("../models/destination");
const Airline = require("../models/airline");

exports.createTransaction = async (req, res) => {
	const {id} = req.authUser;
	const setData = req.body;
	setData.status = 0;
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
	const trx = await transactionModel.findAll({
		where: {
			userId: id
		},
		include: [
			{
				model: productModel,
				as: "product",
				attributes: [
					"day",
					"date",
					"month",
					"years",
					"time_arrive",
					"code"
				],
				include: [Destination, Airline],
			}
		],
		attributes: {
			exclude: ["destinationId", "airlineId" ,"createdAt", "updatedAt"]
		}
	});
	return formResponse(res, 200, "List user transactions!", trx);
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
					attributes: [
						"day",
						"date",
						"month",
						"years",
						"time_arrive",
						"code"
					],
					include: [Destination, Airline],
				}
			]
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