const mysql = require('mysql2/promise'); // versão promissificada

const connect = async () => {
  const conn = await mysql.createConnection(
    'mysql://root:san01xlz@localhost:3307/cat-products',
  );
  return conn;
};
