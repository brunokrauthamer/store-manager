const snakeize = require('snakeize');
const connection = require('./connection');

const registerSalesProduct = async (sale, saleId) => {
  const snakedSale = snakeize(sale);
  const columns = Object.keys(snakedSale)
    .map((column) => `${column}`)
    .join(', ');

  const placeholders = Object.keys(sale)
    .map((_column) => '?')
    .join(', ');

  const salesProductsResponse = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, ${columns}) VALUE (?, ${placeholders})`,
    [saleId, ...Object.values(sale)],
  );
  console.log(salesProductsResponse);
};

const registerSale = async (sale) => {
  const salesResponse = await connection.execute(
    'INSERT INTO StoreManager.sales(date) VALUE(NOW())',
  );

  const saleId = salesResponse[0].insertId;
  // console.log(salesResponse)
  sale.forEach((singleSale) => registerSalesProduct(singleSale, saleId));
  return saleId;
};

// A registerSale recebe o array de vendas e cadastra todas as informações
// pertinentes no banco de dados (duas tabelas) e ainda por cima retorna
// o id da venda

module.exports = {
  registerSale,
};
