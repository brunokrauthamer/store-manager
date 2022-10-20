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
  const allSales = await salesModel.getAllSales();
  return { type: 200, message: allSales };
};

const getSaleById = async (id) => {
  const { type } = validations.validateSearchedSaleId(id);
  if (type) return validations.validateSearchedSaleId(id);
  const sale = await salesModel.getSaleById(id);
  console.log({ type, message: sale });
  return { type, message: sale };
};

getSaleById(91);

module.exports = {
  insertNewSale,
  getAllSales,
};
