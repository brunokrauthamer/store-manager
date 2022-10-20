const models = require('../models');

const { productsModel, salesModel } = models;

const validateNewProduct = ({ name }) => {
  if (!name) return { type: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { type: 422, message: '"name" length must be at least 5 characters long' };
  }
  return { type: null };
};

const validateProductIdKey = (sale) => {
  const verified = sale.reduce((acc, singSale) => acc && Boolean(singSale.productId), true);
  return verified;
};

const validateQuantityKey = (sale) => {
  const verified = sale
    .reduce((acc, singSale) =>
      acc && (singSale.quantity === 0 || Boolean(singSale.quantity)), true);
  console.log((verified));
  return (verified);
};

const validateQuantityValue = (sale) => {
  const verified = sale.reduce((acc, singSale) => acc && singSale.quantity > 0, true);
  return verified;
};

const validateProductIdValue = async (sale) => {
  const productsList = await productsModel.listProducts();
  const productsIds = productsList.map((product) => product.id);
  const productIdsInsert = sale.map((product) => product.productId);
  const verified = productIdsInsert.reduce((acc, id) => acc && productsIds.includes(id), true);
  return verified;
};

// validateProductIdValue([
//   {
//     productId: 3,
//     quantity: 1,
//   },
// ]);

const validateNewSale = async (sale) => {
  if (!validateProductIdKey(sale)) {
    return { type: 400, message: { message: '"productId" is required' } };
  }
  if (!validateQuantityKey(sale)) {
    return { type: 400, message: { message: '"quantity" is required' } };
  }
  if (!validateQuantityValue(sale)) {
    return { type: 422, message: { message: '"quantity" must be greater than or equal to 1' } };
  }
  if (!await validateProductIdValue(sale)) {
    return { type: 404, message: { message: 'Product not found' } };
  }
  return { type: null };
};

const validateSearchedSaleId = async (id) => {
  const ids = await salesModel.getAllSalesIds();
  // console.log(ids.includes(id));
  const validId = ids.includes(id);
  if (validId) {
    return { type: null };
  }
  return {
    type: 404, message: { message: 'Sale not found' },
  };
};

module.exports = {
  validateNewProduct,
  validateNewSale,
  validateSearchedSaleId,
};