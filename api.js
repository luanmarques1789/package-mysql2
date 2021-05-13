const db = require('./db');
const categories = require('./categories')(db);
const products = require('./products')(db);

const test = async () => {
  //await products.create({ product: 'New product', price: 200 });
  /*  await products.addImage(4, {
    description: 'img4',
    url: 'https://image4.com.br',
  }); */
  const prods = await products.findAll();
  //console.log(prods);
  (await db).end();
};

test();
