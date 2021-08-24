const CardPaymentsModel = require("../models/cardPayments");
const profileModel = require("../models/profile");
const { response: formResponse } = require("../helpers/formResponse");

exports.addUserCardPayments = async (req, res) => {
	const { name_card, number, balance, userId } = req.body;
	const cardPay = await CardPaymentsModel.create({nameCard: name_card, number:number, balance: balance
		, userId: userId});
	console.log(cardPay);
	return formResponse(res, 200, "add card payments success!", cardPay);
};

exports.getDetailCard = async (req, res) => {
	const {id} = req.params;
	const card = await CardPaymentsModel.findByPk(id, {
		include: [
			{
				model: profileModel
			}
		]
	});
	return formResponse(res, 200, "add card payments success!", card);
};