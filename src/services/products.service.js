const models = require('../models');
const validations = require('./validationsInputValue');

const { productsModel } = models;
const { validateNewProduct, validateSearchedSaleId } = validations;

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

const updateProductById = async (id, nameObj) => {
  const nameResponse = await validateNewProduct(nameObj);
  // console.log(nameResponse);
  const nameType = nameResponse.type;
  const nameMessage = nameResponse.message;
  // console.log(nameType);
  if (nameType) return { type: nameType, message: { message: nameMessage } };
  const idResponse = await validateSearchedSaleId(id, 'Product');
  const idType = idResponse.type;
  // console.log(response);
  if (idType) return idResponse;
  const { name } = nameObj;
  await productsModel.updateProductById(id, name);
  // console.log({ type, message: { id, name } });
  return { type: 200, message: { id, name } };
};

// updateProductById(1, { nam: 'a' });

module.exports = {
  getProductById,
  getAllProducts,
  insertProduct,
  updateProductById,
};
