const cardPay = require("express").Router();
const cardPayController = require("../controllers/cardPayments");

cardPay.get("/:id", cardPayController.getDetailCard);
cardPay.post("/", cardPayController.addUserCardPayments);

module.exports = cardPay;