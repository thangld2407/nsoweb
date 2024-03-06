const { conn } = require('../../utils/db');

module.exports = async (req, res) => {
	const user = req.session.user;
	if (!user) {
		return res.status(200).json({
			error_code: 100,
			message: 'Không có thông tin user'
		});
	}
	try {
		const query = `SELECT * FROM player WHERE username = '${user.username}'`;

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
				const ninjas = JSON.parse(user.ninja);
				console.log(user.luong);
				if (ninjas.length > 0) {
					const query = `UPDATE ninja SET itemBag = '[]' WHERE name = '${ninjas[0]}'`;
					const queryUpdateLuong = `UPDATE player SET luong = '${
						+user.luong - 20000
					}' WHERE username = '${user.username}'`;
					if (user.luong < 20000) {
						return res.status(200).json({
							error_code: 100,
							message: 'Số dư không đủ'
						});
					}
					conn.query(queryUpdateLuong, (e, rsss) => {
						console.log(rsss);
						if (e) {
							return res.status(200).json({
								error_code: 100,
								message: 'Liên hệ quản trị viên'
							});
						}
						conn.query(query, (e, rs) => {
							if (e) {
								return res.status(200).json({
									message: e.message,
									error_code: 100
								});
							}
							if (rs) {
								req.session.user.luong -= 20000;
								res.status(200).json({
									status_code: 200,
									message: 'Đã xoá thành thành công'
								});
							} else {
								res.status(200).json({
									error_code: 100,
									message: 'Liên hệ quản trị viên'
								});
							}
						});
					});
				} else {
					res.status(200).json({
						error_code: 100,
						message: 'Bạn chưa có nhân vật'
					});
				}
			} else {
				res.status(200).json({
					error_code: 100,
					message: 'Liên hệ quản trị viên'
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
