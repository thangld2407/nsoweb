const { conn } = require('../../utils/db');

module.exports = async (req, res) => {
	try {
		const { oldPassword, password, password_confirmation } = req.body;
		if (!oldPassword || !password || !password_confirmation) {
			return res.status(200).json({
				message: 'Vui lòng nhập đầy đủ thông tin',
				error_code: 100
			});
		}

		const user = req.session.user;
		console.log(user, 'user');
		if (!user) {
			return res.status(200).json({
				message: 'Không có thông tin user',
				error_code: 100
			});
		}

		if (password !== password_confirmation) {
			return res.status(200).json({
				message: 'Vui lòng xác nhận lại mật khẩu',
				error_code: 100
			});
		}
		const query = `SELECT * FROM player WHERE username = ?`;

		conn.query(query, [user.username], (err, result) => {
			if (err) {
				return res.status(200).json({
					message: 'Không tìm thấy user',
					error_code: 100
				});
			}

			if (result && result[0] && result[0].password) {
				const userPass = result[0].password;

				if (userPass !== oldPassword) {
					return res.status(200).json({
						message: 'Sai mật khẩu rồi ',
						error_code: 100
					});
				}

				const queryUpdate = `UPDATE player SET password = ? WHERE username = ?`;

				conn.query(queryUpdate, [password, user.username], (err, result) => {
					if (err) {
						return res.status(200).json({
							message: ' update password failed',
							error_code: 100
						});
					}
					req.session.destroy();
					return res.status(200).json({
						message: ' Cập nhật thành công',
						status_code: 200
					});
				});
			} else {
				return res.status(200).json({
					message: ' update password failed',
					error_code: 100
				});
			}
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
			error_code: 100
		});
	}
};
