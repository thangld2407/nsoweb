const changePw = require('../../../../controller/Auth/changePw');
const login = require('../../../../controller/Auth/login');
const register = require('../../../../controller/Auth/register');

const routerAuht = require('express').Router();

routerAuht.post('/register', register);
routerAuht.post('/login', login);
routerAuht.post('/changepw', changePw);

module.exports = routerAuht;
