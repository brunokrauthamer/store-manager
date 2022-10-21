const camelize = require('camelize');
const models = require('../models');
const validations = require('./validationsInputValue');

const { salesModel } = models;
const { validateNewSale } = validations;

const insertNewSale = async (sale) => {
  const validationInfo = await validateNewSale(sale);
  const { type } = validationInfo;
  if (type) return validationInfo;
  const id = await salesModel.registerSale(sale);
  return {
    type: 201,
    message: {
      id,
      itemsSold: sale,
    },
  };
};

const getAllSales = async () => {
  const allSales = camelize(await salesModel.getAllSales());
  return { type: 200, message: allSales };
};

const getSaleById = async (id) => {
  const response = await validations.validateSearchedSaleId(id, 'Sale');
  const { type } = response;
  // console.log(response, type);
  if (type) return response;
  const sale = camelize(await salesModel.getSaleById(id));
  // console.log({ type: 200, message: sale });
  return { type: 200, message: sale };
};

module.exports = {
  insertNewSale,
  getAllSales,
  getSaleById,
};
