const { productsModel } = require('../models');

const getProductById = async (id) => {
  const allProducts = await productsModel.listProducts();
  const productById = allProducts.find((product) => id === product.id);
  if (productById) {
    console.log(productById);
    return { type: null, message: productById };
  }
  console.log({ message: 'Product not found' });
  return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
};

const getAllProducts = async () => {
  const allProducts = await productsModel.listProducts();
  return { type: null, message: allProducts };
};

module.exports = {
  getProductById,
  getAllProducts,
};
