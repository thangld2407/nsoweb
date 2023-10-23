const { conn } = require('../../utils/db');

module.exports = async (req, res) => {
	try {
		const { username, email, password, invite } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({
				message: 'Thiếu thông tin đăng ký',
				error_code: 100
			});
		}
		const queryExistUser = `SELECT * FROM player WHERE username = '${username}'`;
		let isExist = false;
		conn.query(queryExistUser, (err, result) => {
			if (result && result[0]) {
				isExist = true;
			} else {
				isExist = false;
			}

			if (isExist) {
				return res.status(200).json({
					error_code: 100,
					message: 'Tài khoản đã tồn tại'
				});
			}

			const query = `INSERT INTO player (username, password) VALUES ('${username}', '${password}')`;

			conn.query(query, function (err, result) {
				if (err) {
					return res.status(200).json({
						error_code: 100,
						message: err.message
					});
				}
				res.status(200).json({
					status_code: 200,
					message: 'Đăng ký tài khoản thành công'
				});
			});
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: error.message,
			code: 500
		});
	}
};
