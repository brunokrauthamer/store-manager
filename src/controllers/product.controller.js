const { productService } = require('../services');

const listAllProducts = async (req, res) => {
  const response = await productService.getAllProducts();
  return res.status(200).json(response);
};

const productById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.getProductById(id);
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  productById,
};