/**
 *
 * @param {Function} conn - connection
 */
const init = (connection) => {
  const create = async (data) => {
    const conn = await connection;
    await conn.query(`INSERT INTO products(product, price) VALUE (?, ?)`, [
      data.product,
      data.price,
    ]);
  };

  const remove = async (id) => {
    const conn = await connection;
    await conn.query('DELETE FROM products WHERE id = ? LIMIT 1', [id]);
  };

  const update = async (id, data) => {
    const conn = await connection;
    await conn.query(
      'UPDATE products SET product = ?, price = ? WHERE id = ?',
      [data, id],
    );
  };

  const findAll = async () => {
    const conn = await connection;
    const [results] = await conn.query('SELECT * FROM products');

    /**
     * Iterando sobre o array de objetos results
     * Crio um novo e diferente array com apenas os id's
     * de results
     *
     * */
    const productIds = results.map((product) => product.id).join(', ');
    const [images] = await conn.query(
      'SELECT * FROM images WHERE product_id in (?) GROUP BY product_id',
      [productIds],
    );
    console.log(images);
    const mapImages = images.reduce((previousValue, currentValue) => {
      return { ...previousValue, [currentValue.product_id]: currentValue };
    }, {});

    //console.log(mapImages, '\n=========================\n');

    const products = results.map((product) => {
      return {
        ...product,
        images: mapImages[product.id],
      };
    });

    return products;
  };

  const findOne = async (id, fields) => {
    const conn = await connection;
    const [result] = await conn.query('SELECT ? FROM products WHERE id = ?', [
      fields,
      id,
    ]);
    return result[0];
  };

  /**
   *
   * @param {Number} productId
   * @param {Object} data - Fields about image
   * @param {String} data.description - image's description
   * @param {String} data.url - image's URL
   *
   */
  const addImage = async (productId, data) => {
    const conn = await connection;
    await conn.query(
      'INSERT INTO images (product_id, description, url) VALUES (?, ?, ?);',
      [productId, data.description, data.url],
    );
  };

  return {
    create,
    remove,
    update,
    findAll,
    findOne,
    addImage,
  };
};

module.exports = init;
