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

  const [response] = await connection.execute(
    `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );
  console.log(response.insertId);
  return response.insertId;
};

insertProduct({
  name: 'ProdutoX',
});

module.exports = {
  listProducts,
  insertProduct,
};
