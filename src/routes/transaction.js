const transaction = require("express").Router();
const transactionController = require("../controllers/transaction");
const auth = require("../middleware/checkToken");

transaction.post("/post-transaction", auth, transactionController.createTransaction);
transaction.get("/user-transaction", auth, transactionController.getTransaction);
transaction.patch("/payment-process/:id", auth, transactionController.paymentProcess);
transaction.get("/detail-transaction/:id", auth, transactionController.getDetailTransaction);
transaction.patch("/delete-transaction/:id", auth, transactionController.deletedTransactionBy);
module.exports = transaction;