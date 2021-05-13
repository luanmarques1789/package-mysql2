const mysql = require('mysql2/promise'); // versão promissificada

(async () => {
  try {
    const conn = await mysql.createConnection(
      'mysql://root:san01xlz@localhost:3307/cat_products',
    );

    try {
      const [results] = await conn.query(
        `INSERT INTO products(product, price) VALUE (?, ?)`,
        ['produto2', 298.09],
      );
      await conn.query(
        'INSERT INTO products_categories(product_id, category_id) VALUES(?, ?)',
        [results.insertId, 3],
      );
      console.log(results, `\nID do produto: ${results.insertId}`);

      conn.end();
    } catch (err) {
      console.log('Aqui está o erro:', err);
    }
  } catch (err) {
    console.log(err);
  }
})();
