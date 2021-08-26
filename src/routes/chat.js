const chat = require("express").Router();
const auth = require("../middleware/checkToken");
const file = require("../middleware/attachFile");
const chatController = require("../controllers/chat");


chat.post("/send/:id", auth, file, chatController.createChat);
chat.get("/room/:id", auth, chatController.getChatRoom);
chat.get("/user-chat", auth, chatController.getLatestUserChat);
chat.delete("/delete/:id", auth, chatController.deleteChat);

module.exports = chat;