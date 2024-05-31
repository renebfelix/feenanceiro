require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: process.env.APP_HOST,
	user: process.env.APP_USER,
	password: process.env.APP_PASSWORD,
	database: process.env.APP_DATABASE,
});

connection.connect(function(err: any) {
	if (err) {
		console.log(err);
	} else {
		console.log("Database connected!")
	}
});

export { connection };
