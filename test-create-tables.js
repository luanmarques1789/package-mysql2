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
			const [results] = await conn.query(`SHOW TABLES`);
			console.log(results);
			if (results.length === 0) {
				await conn.query(`
          CREATE TABLE categories(
            id INTEGER NOT NULL AUTO_INCREMENT,
            category VARCHAR(255) NOT NULL,
            PRIMARY KEY(id)
          );

          CREATE TABLE products(
            id INTEGER NOT NULL AUTO_INCREMENT,
            product VARCHAR(255) NOT NULL,
            price FLOAT NOT NULL, 
            PRIMARY KEY(id),
            );

          CREATE TABLE images(
            id INTEGER NOT NULL AUTO_INCREMENT,
            description VARCHAR(255) NOT NULL,
            url NOT NULL,
            product_id INT NOT NULL,
            PRIMARY KEY(id),
            
            CONSTRAINT fk_images_products_constr 
            FOREIGN KEY (product_id)
            REFERENCES products(id)
            ON DELETE CASCADE
            ON UPDATE CASCADE
          );
          `);

				console.log('Tables were created with success');
			} else {
				console.log('Tables already exist');
			}

			conn.end();
		} catch (err) {
			console.log('Aqui está o erro:', err);
			conn.end();
		}
	} catch (err) {
		console.log(err);
	}
};

run();
