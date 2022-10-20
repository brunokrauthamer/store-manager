const services = require('../services');

const { salesService } = services;

const insertSale = async (req, res) => {
  const sale = req.body;
  const response = await salesService.insertNewSale(sale);
  const { type, message } = response;
  return res.status(type).json(message);
};

module.exports = {
  insertSale,
};
