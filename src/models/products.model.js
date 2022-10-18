// const camelize = require('camelize');
const connection = require('./connection');

const listProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products',
  );
  return JSON.parse(JSON.stringify(result));
};

module.exports = {
  listProducts,
};
