const models = require('../models');
const validations = require('./validationsInputValue');

const { productsModel } = models;
const { validateNewProduct } = validations;

const getProductById = async (id) => {
  const allProducts = await productsModel.listProducts();
  const productById = allProducts.find((product) => id === product.id);
  if (productById) {
    return { type: null, message: productById };
  }
  return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
};

const getAllProducts = async () => {
  const allProducts = await productsModel.listProducts();
  return { type: null, message: allProducts };
};

const insertProduct = async (product) => {
  const validation = validateNewProduct(product);
  if (validation.type) {
    return validation;
  }
  const id = await productsModel.insertProduct(product);
  return { type: null, message: { id, name: product.name } };
};

module.exports = {
  getProductById,
  getAllProducts,
  insertProduct,
};
