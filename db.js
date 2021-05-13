const mysql = require('mysql2/promise'); // versão promissificada

module.exports = mysql.createConnection(
  'mysql://root:san01xlz@localhost:3307/cat_products',
);
console.log('Database connected');
