// const camelize = require('camelize');
const connection = require('./connection');

const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return JSON.parse(JSON.stringify(result));
};

const insertProduct = async (product) => {
  const columns = Object.keys(product)
    .map((key) => `${key}`)
    .join(', ');
  
  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const response1 = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );
  const [response] = response1;
  console.log(typeof response);
  return response.insertId;
};

const updateProductById = async (id, newName) => {
  await connection.execute(
    `UPDATE StoreManager.products SET name = '${newName}' WHERE id = ${id}`,
  );
};

const deleteProduct = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.products WHERE id = ${id}`,
  );
};

module.exports = {
  listProducts,
  insertProduct,
  updateProductById,
  deleteProduct,
};
