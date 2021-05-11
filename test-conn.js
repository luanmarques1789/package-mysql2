const mysql = require('mysql2/promise'); // versão promissificada

const run = async () => {
	try {
		const conn = await mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'san01xlz',
			database: 'cat-products',
			port: 3307,
		});
		try {
			const [results, fields] = await conn.query('SELECT * FROM categories');
			console.log(results, fields);

			conn.end();
		} catch (err) {
			console.log('Aqui está o erro:', err);
		}
	} catch (err) {
		console.log(err);
	}
};

run();
