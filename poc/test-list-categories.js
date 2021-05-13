const mysql = require('mysql2/promise'); // versão promissificada

(async () => {
  try {
    const conn = await mysql.createConnection(
      'mysql://root:san01xlz@localhost:3307/cat_products',
    );

    try {
      const [results, fields] = await conn.query(`SELECT * FROM categories`);
      console.log(results);

      conn.end();
    } catch (err) {
      console.log('Aqui está o erro:', err);
    }
  } catch (err) {
    console.log(err);
  }
})();
