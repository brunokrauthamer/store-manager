const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');

const productsModel = require('../../../src/models/products.model');

const { products } = require('./mocks/product.services.mock');

describe('Verifica o service de product', () => {
  afterEach(sinon.restore);
  it('Verifica o retorno caso seja passado um id correto', async () => {
    sinon.stub(productsModel, 'listProducts').resolves(products);

    const result = await productService.getProductById(2);

    expect(result.message).to.be.deep.equal(products[1])
  });
  
  it('Verifica o retorno com id incorreto', async () => {
    sinon.stub(productsModel, 'listProducts').resolves(products);

    const result = await productService.getProductById(7);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Verifica o retorno quando é solicitada toda a lista', async () => {
    sinon.stub(productsModel, 'listProducts').resolves(products);

    const result = await productService.getAllProducts();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(products);
  })
})