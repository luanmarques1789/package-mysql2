const mysql = require('mysql2/promise'); // versão promissificada
const { tables } = require('./tables');

(async function connect() {
  try {
    const conn = await mysql.createConnection(
      'mysql://root:san01xlz@localhost:3307/cat_products',
    );
    console.log('Database connected!');
    try {
      const [result] = await conn.query('SHOW TABLES');
      if (result.length === 0) {
        console.log('ZERO');
        await conn.query(tables.categories);
        await conn.query(tables.products);
        await conn.query(tables.images);
        await conn.query(tables.products_categories);
        const [reload] = await conn.query('SHOW TABLES');
        console.log(`${reload.length} tables were created with success!`);
      } else {
        console.log('Tables already exist!');
      }
      conn.end();
    } catch (err) {
      console.log('Faild', err);
      conn.end();
    }
  } catch (err) {
    console.log(err);
    conn.end();
  }
})();
