exports.response = (res, status = 200, message, results) => {
	const returnData = {
		success: true,
		message
	};

	if (status >= 400) {
		returnData.success = false;
	}

	if (results !== null) {
		returnData.results = results;
	}
	return res.status(status).json(returnData);
};