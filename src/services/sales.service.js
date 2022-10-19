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

module.exports = {
  insertNewSale,
};
