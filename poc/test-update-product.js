const mysql = require('mysql2/promise'); // versão promissificada

(async () => {
  try {
    const conn = await mysql.createConnection(
      'mysql://root:san01xlz@localhost:3307/cat_products',
    );

    try {
      // É ideal/por segurança sempre limitar o número de registros a serem excluídos
      const [results] = await conn.query(
        `UPDATE products SET product = ?, price = ? WHERE id = ?`,
        ['New prod name', 300, 3],
      );
      console.log(results);

      conn.end();
    } catch (err) {
      console.log('Aqui está o erro:', err);
    }
  } catch (err) {
    console.log(err);
  }
})();
