const snakeize = require('snakeize');
const connection = require('./connection');

const registerSale = async (sale) => {
  const salesResponse = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUE(NOW())',
  );
  // console.log(salesResponse)
  const columns = Object.keys(sale[0])
    .map((column) => snakeize(column))
    .join(', ');
  
  const placeholders = Object.keys(sale[0])
    .map((_column) => '?')
    .join(', ');
  
  const salesProductsResponse = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}) VALUE (${placeholders})`,
  );
};

// registerSale();

module.exports = {
  registerSale,
};
