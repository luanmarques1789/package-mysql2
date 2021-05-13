const mysql = require('mysql2/promise'); // versão promissificada

async function connect() {
  try {
    if (global.connection && global.connection.state !== 'disconnected') {
      console.error('It was impossible connect to the database');
      return global.connection;
    }
    const conn = await mysql.createConnection(
      'mysql://root:san01xlz@localhost:3307/cat_products',
    );

    console.log('Database connected!');
    global.connection = conn;
    global.connection.state = 'connected';
    return conn;
  } catch (err) {
    console.error(err);
  }
}
