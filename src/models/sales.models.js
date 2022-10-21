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

const getAllSales = async () => {
  const columns = 'sp.sale_id, s.date, sp.product_id, sp.quantity';
  const firstTable = 'StoreManager.sales_products as sp';
  const secondTable = 'StoreManager.sales as s';
  const innerJoinCondition = 's.id = sp.sale_id';
  const order = 'sp.sale_id, sp.product_id';
  const [allSales] = await connection.execute(
    `SELECT ${columns}
    FROM ${firstTable}
    INNER JOIN ${secondTable}
    ON ${innerJoinCondition}
    ORDER BY ${order}`,
  );
  console.log(JSON.parse(JSON.stringify(allSales)));
  return JSON.parse(JSON.stringify(allSales));
};

// getAllSales();

const getSaleById = async (id) => {
  const columns = 's.date, sp.product_id, sp.quantity';
  const firstTable = 'StoreManager.sales_products as sp';
  const secondTable = 'StoreManager.sales as s';
  const innerJoinCondition = 's.id = sp.sale_id';
  const idCondition = `sp.sale_id = ${id}`;
  const order = 'sp.product_id';
  const [sale] = await connection.execute(
    `SELECT ${columns}
    FROM ${firstTable} 
    INNER JOIN ${secondTable}
    ON ${innerJoinCondition}
    WHERE ${idCondition}
    ORDER BY ${order}`,
  );
  // console.log(JSON.parse(JSON.stringify(sale)));
  return JSON.parse(JSON.stringify(sale));
};

// getSaleById(1);

const getAllSalesIds = async () => {
  const [ids] = await connection.execute(
    'SELECT id FROM StoreManager.sales',
  );
  // console.log(ids);
  const formatedIds = JSON.parse(JSON.stringify(ids)).map((obj) => obj.id);
  // console.log(formatedIds);
  return formatedIds;
};

// getAllSalesIds();
// A registerSale recebe o array de vendas e cadastra todas as informações
// pertinentes no banco de dados (duas tabelas) e ainda por cima retorna
// o id da venda

module.exports = {
  registerSale,
  getAllSales,
  getSaleById,
  getAllSalesIds,
};
