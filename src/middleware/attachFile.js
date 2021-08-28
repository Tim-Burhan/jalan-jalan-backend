const multer = require("multer");
const path = require("path");
const { response: formResponse } = require("../helpers/formResponse");

const maxSize = 1024 * 1024 * 4;

const storage = multer.diskStorage({
	destination(_req, _file, cb) {
		cb(null, path.join(process.cwd(), "assets", "files"));
	},
	filename: function (req, file, cb) {
		cb(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: maxSize },
}).single("attachFile");

const uploadFilter = (req, res, next) => {
	upload(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			return formResponse(res, 400, err.message, );
		} if (err) {
			return formResponse(res, 500, err.message );
		}
		next();
		return res;
	});
};

module.exports = uploadFilter;