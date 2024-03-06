const mysql = require('mysql2');

const conn = mysql.createConnection({
	host: 'localhost',
	user: 'thangld',
	password: '1',
	database: 'thanhson',
	port: 55006
});

const connectToDB = () => {
	conn.connect(err => {
		if (err) throw err;
		console.log('connect to database');
	});
};

module.exports = { connectToDB, conn };
