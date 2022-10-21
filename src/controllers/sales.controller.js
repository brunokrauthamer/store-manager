const services = require('../services');

const { salesService } = services;

const insertSale = async (req, res) => {
  const sale = req.body;
  const response = await salesService.insertNewSale(sale);
  const { type, message } = response;
  return res.status(type).json(message);
};

const getAllSales = async (req, res) => {
  const response = await salesService.getAllSales();
  const { type, message } = response;
  return res.status(type).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSaleById(Number(id));
  const { type, message } = response;
  return res.status(type).json(message);
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
};
