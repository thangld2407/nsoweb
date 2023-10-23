const { conn } = require('../../utils/db');

module.exports = async (req, res) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(200).json({
				error_code: 100,
				message: 'Vui lòng nhập tài khoản và mật khẩu'
			});
		}
		const query = `SELECT * FROM player WHERE username = '${username}' AND password = '${password}'`;

		conn.query(query, (err, result) => {
			if (err) {
				return res.status(200).json({
					message: err.message,
					error_code: 100
				});
			}

			if (result && result[0] && result[0].username) {
				const rs = result[0];
				const { password, ...user } = rs;
				req.session.user = user;
				res.status(200).json({
					user,
					status_code: 200,
					message: 'Đăng nhập thành công'
				});
			} else {
				res.status(200).json({
					error_code: 100,
					message: 'Tài khoản hoặc mật khẩu không chính xác '
				});
			}
		});
	} catch (error) {
		res.status(500).json({
			error_code: 100,
			message: error.message
		});
	}
};
