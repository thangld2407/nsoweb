const removeBag = require('../../../../controller/User/removeBag');
const requireLogin = require('../../../../middleware/requireLogin');

const routerUser = require('express').Router();

routerUser.post('/remove-bag', requireLogin, removeBag)

module.exports = routerUser;