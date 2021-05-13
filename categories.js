/**
 *
 * @param {Function} conn - connection
 */
const init = (connection) => {
  const create = async (data) => {
    const conn = await connection;
    await conn.query(`INSERT INTO categories(category) VALUE (?)`, [data]);
  };

  const remove = async (id) => {
    const conn = await connection;
    await conn.query('DELETE FROM categories WHERE id = ? LIMIT 1', [id]);
  };

  const update = async (id, data) => {
    const conn = await connection;
    await conn.query('UPDATE categories SET category = ? WHERE id = ?', [
      data,
      id,
    ]);
  };

  const findAll = async () => {
    const conn = await connection;
    const [results] = await conn.query('SELECT * FROM categories');
    return results;
  };

  const findOne = async (id, fields) => {
    const conn = await connection;
    const [result] = await conn.query('SELECT ? FROM categories WHERE id = ?', [
      fields,
      id,
    ]);
    return result[0];
  };

  return {
    create,
    remove,
    update,
    findAll,
    findOne,
  };
};

module.exports = init;
