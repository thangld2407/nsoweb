require('dotenv').config();
const { connectToDB } = require('./utils/db');
const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const cors = require('cors');
const app = express();

app.use(morgan('dev'));
app.use(cors('*'));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const i18n = require('./i18n');
app.use(i18n);
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1000000 } }));

const router = require('./routes');
app.use(router);

const errorHandle = require('./helper/errorHandle');
app.use(errorHandle);

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

connectToDB();
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
