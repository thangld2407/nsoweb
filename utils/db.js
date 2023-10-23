const mysql = require('mysql');

const conn = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'thanhson',
	port: 6363
});

const connectToDB = () => {
	conn.connect(err => {
		if (err) throw err;
		console.log('connect to database');
	});
};

module.exports = { connectToDB, conn };
