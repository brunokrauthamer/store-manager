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

const insertNewProduct = async (req, res) => {
  const product = req.body;
  const { type, message } = await productService.insertProduct(product);
  if (type) return res.status(type).json({ message });
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const nameObj = req.body;
  const { id } = req.params;
  const { type, message } = await productService.updateProductById(Number(id), nameObj);
  return res.status(type).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.deleteProduct(Number(id));
  if (type) return res.status(type).json(message);
  return res.status(204).end();
};

module.exports = {
  listAllProducts,
  productById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
};