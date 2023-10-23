const routerAuht = require('./module/auth');

const routerApi = require('express').Router();

routerApi.get('/', (req, res) => {
	res.json({
		message: req.__('API_WORKING')
	});
});

routerApi.use('/auth', routerAuht);

module.exports = routerApi;
