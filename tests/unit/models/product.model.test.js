const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products, oneProduct } = require('./mocks/product.model.mock');

describe('Testes de unidade do model de prodtos', () => {
  afterEach(sinon.restore);
  it('Verifica se a lista está correta', async () => {
    sinon.stub(connection, 'execute').resolves([products]);
    const result = await productsModel.listProducts();
    expect(result).to.be.deep.equal(products);
  });
});