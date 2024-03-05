const { FILES_DOWNLOAD } = require('../../constant/files');
const requireLogin = require('../../middleware/requireLogin');
const authAjax = require('./module/auth');

const routerClient = require('express').Router();

routerClient.get('/', (req, res) => {
	const user = req.session.user;
	let isLogin = false;
	if (user) {
		isLogin = true;
	}
	res.render('./components/layout.ejs', {
		page: '../pages/home.ejs',
		user: isLogin ? user : {},
		isLogin: isLogin
	});
});

routerClient.get('/dang-nhap', (req, res) => {
	const user = req.session.user;
	let isLogin = false;
	if (user) {
		isLogin = true;
	}

	if (isLogin) {
		return res.redirect('/');
	}
	res.render('./components/layout.ejs', {
		page: '../pages/login.ejs',
		user: isLogin ? user : {},
		isLogin: isLogin
	});
});

routerClient.get('/dang-ky', (req, res) => {
	const user = req.session.user;
	let isLogin = false;
	if (user) {
		isLogin = true;
	}

	res.render('./components/layout.ejs', {
		page: '../pages/register.ejs',
		user: isLogin ? user : {},
		isLogin: isLogin
	});
});

routerClient.get('/download', (req, res) => {
	const user = req.session.user;
	let isLogin = false;
	if (user) {
		isLogin = true;
	}

	res.render('./components/layout.ejs', {
		page: '../pages/download.ejs',
		isLogin: isLogin,
		files: FILES_DOWNLOAD,
		user: isLogin ? user : {}
	});
});

routerClient.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

routerClient.get('/user', requireLogin, (req, res) => {
	const user = req.session.user;
	let isLogin = false;
	if (user) {
		isLogin = true;
	}
	res.render('./components/layout.ejs', {
		page: '../pages/profiles/index.ejs',
		user: isLogin ? user : {},
		isLogin: isLogin
	});
});

routerClient.get('/change-password', requireLogin, (req, res) => {
	const user = req.session.user;
	let isLogin = false;
	if (user) {
		isLogin = true;
	}
	res.render('./components/layout.ejs', {
		page: '../pages/profiles/doimatkhau.ejs',
		user: isLogin ? user : {},
		isLogin: isLogin
	});
});

routerClient.get('/exchange', requireLogin , (req, res) => {
	const user = req.session.user;
	let isLogin = false;
	if (user) {
		isLogin = true;
	}
	res.render('./components/layout.ejs', {
		page: '../pages/exchange.ejs',
		user: isLogin ? user : {},
		isLogin: isLogin
	});
});	

routerClient.use('/auth', authAjax);

routerClient.get('*', (req, res) => {
	const user = req.session.user;
	let isLogin = false;
	if (user) {
		isLogin = true;
	}
	res.render('./components/layout.ejs', {
		page: '../pages/404.ejs',
		user: isLogin ? user : {},
		isLogin: isLogin
	});
});

module.exports = routerClient;
