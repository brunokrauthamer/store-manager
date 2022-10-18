const services = require('../services');

const { productService } = services;

const listAllProducts = async (req, res) => {
  const { message } = await productService.getAllProducts();
  return res.status(200).json(message);
};

const productById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(Number(id));
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  productById,
};