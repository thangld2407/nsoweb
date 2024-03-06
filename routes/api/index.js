const routerAuht = require('./module/auth');
const routerUser = require('./module/user');

const routerApi = require('express').Router();

routerApi.get('/', (req, res) => {
	res.json({
		message: req.__('API_WORKING')
	});
});

routerApi.use('/auth', routerAuht);
routerApi.use('/user', routerUser)
module.exports = routerApi;
