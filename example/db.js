const mysql = require('mysql2/promise'); //Wrapper com suporte a promises

async function connect() {
  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }
  const conn = await mysql.createConnection(
    'mysql://root:san01xlz@localhost:3307/crud',
  );
  console.log('Conectou no MySQL!');
  global.connection = conn;
  return conn;
}

async function insertCustomers(customer) {
  const conn = await connect();

  const values = [customer.nome, customer.estado];
  const sql = 'INSERT INTO clients(nome, estado) VALUES (?, ?);';

  await conn.query(sql, values); // SQL Injections
  console.log('Field inserted!');
}

async function updateCustomers(id, customer) {
  const conn = await connect();
  const sql = 'UPDATE clients SET nome=?, estado=? WHERE id=?';
  const values = [customer.nome, customer.estado, id];
  await conn.query(sql, values);
  console.log('Field updated');
}

async function selectCustomers() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * FROM clients');
  return rows;
}

async function deleteCustomer(id) {
  const conn = await connect();
  const sql = 'DELETE FROM clients WHERE id=?';
  await conn.query(sql, id);
  console.log('Field deleted');
}

module.exports = {
  selectCustomers,
  updateCustomers,
  insertCustomers,
  deleteCustomer,
};
