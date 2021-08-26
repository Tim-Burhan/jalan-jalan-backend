const Chat = require("../models/chat");
const Profile = require("../models/profile");
const { response: formResponse } = require("../helpers/formResponse");
const {Op} = require("sequelize");
const { APP_UPLOADS_ROUTE } = process.env;

exports.createChat = async (req, res) => {
	const setData = req.body;
	const {id} = req.params;
	setData.sender = req.authUser.id;
	setData.recipient = id;
	setData.isLatest = 1;

	const changeData = {
		isLatest: 0,
	};

	try {
		if (req.file) {
			setData.attachFile = `${APP_UPLOADS_ROUTE}/${req.file.filename}`;
		} else {
			setData.attachFile = null;
		}
		await Chat.update(changeData, {
			where: {
				sender: {
					[Op.in]: [setData.sender, id],
				},
				[Op.and]: {
					recipient: {
						[Op.in]: [setData.sender, id],
					},
				},
			},
		}, (err, resUpdate) => {
			if (!err) return formResponse(res, 200, resUpdate);
			return resUpdate;
		});
		const result = await Chat.create(setData);
		console.log(req.socket);
		req.socket.emit(setData.recipient, {
			sender: setData.sender,
			senderData: req.authUser,
			recipient: setData.recipient,
			message: setData.message,
		});
		return formResponse(res, 200, result);
	} catch (error) {
		console.log(error);
		return formResponse(res, 500, "an error Occured!");
	}
};

exports.getChatRoom = async (req, res) => {
	const { id } = req.params;
	const sender = req.authUser.id;
	try {
		const result = await Chat.findAll({
			where: {
				sender: {
					[Op.in]: [sender, id],
				},
				[Op.and]: {
					recipient: {
						[Op.in]: [sender, id],
					},
				},
			},
		});
		return formResponse(res, 200, result);
	} catch (err) {
		console.log(err);
		return formResponse(res, 500, "An error occured");
	}
};

exports.deleteChat = async (req, res) => {
	const { id } = req.params;
	const sender = req.authUser.id;
	try {
		const chat = await Chat.findByPk(req.body.chatId);
		await chat.destroy();
		const chats = await Chat.findAll({
			order: [["createdAt", "DESC"]],
			where: {
				sender: {
					[Op.in]: [sender, id],
				},
				[Op.and]: {
					recipient: {
						[Op.in]: [id, sender],
					},
				},
				isLatest: 0,
			},
			limit: 1,
		});
		console.log(chats[0].isLatest);
		chats[0].isLatest = true;
		await chats[0].save();
		return formResponse(res, 200, chats);
	} catch (error) {
		return formResponse(res, 500, "An error occured");
	}
};

exports.getLatestUserChat = async (req, res) => {
	try {
		const chat = await Chat.findAll({
			include: [
				{
					model: Profile,
					attributes: { exclude: ["createdAt", "updatedAt", "email", "password"] },
				},
			],

			order: [["id", "DESC"]],
			where: {
				[Op.or]: [{ sender: req.authUser.id }, { recipient: req.authUser.id }],
				[Op.and]: [{ isLatest: 1 }],
			},
		});
		return formResponse(res, 200, chat);
	} catch (err) {
		return formResponse(res, 500, "An error occured");
	}
};