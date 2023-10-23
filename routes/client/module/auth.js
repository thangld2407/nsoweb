const service = require('../../../api');

const authAjax = require('express').Router();
authAjax.post('/login', async (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	try {
		const data = {
			username,
			password
		};
		const response = await service({
			method: 'POST',
			data,
			url: '/auth/login'
		});
		console.log(response.data);
		if (response.data && response.data.status_code) {
			res.render('./components/layout.ejs', {
				page: '../pages/login.ejs',
				isLogin: true,
				user: response.data.user
			});
		} else {
			res.redirect('/dang-nhap');
		}
	} catch (error) {
		res.send(error.response.data);
	}
});
module.exports = authAjax;
