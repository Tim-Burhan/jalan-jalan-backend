const multer = require("multer");
const path = require("path");
const {response:formResponse} = require("../helpers/formResponse");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(process.cwd(), "assets", "images"));
	},
	filename: function (req, file, cb) {
		const ext = file.originalname.split(".")[1];
		const date = new Date();
		cb(null, `${date.getTime()}.${ext}`);
	}
});

const upload = multer({ storage, 
	limits: { fileSize: 1024 * 1024 * 2 },
	fileFilter: (req, file, callback) => {
		const mimitype = path.extname(file.originalname);
		if (mimitype !== ".png" && mimitype !== ".jpg" && mimitype !== ".jpeg" ) {
			return callback(new Error("Only images are allowed!"));
		}
		callback(null, true);
	}
}).single("picture");

const uploadFilter = (req, res, next) => {
	upload(req, res, (err) => {
		if(err instanceof multer.MulterError) {
			return formResponse(res, 400, err.message);
		}
		else if(err) {
			return formResponse(res, 400, err.message);
		}
		next();
	});
};
module.exports = uploadFilter ;