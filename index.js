(async () => {
  const db = require('./db');
  console.log('Start...');
  await db.updateCustomers(2, { nome: 'Fábio', estado: 'Paraná' });
  const clients = await db.selectCustomers();
  console.log(clients);
})();
