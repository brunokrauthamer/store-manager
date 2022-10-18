const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { validateNewProduct } = require('../../../src/services/validationsInputValue');

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
  });
  it('Verifica se o retorna corretamente quando nao ha o campo name', () => {
    const response = validateNewProduct({ nome: 'Nome' });
    expect(response.type).to.be.equal(400);
  });
  it('Verifica se o retorna corretamente quando name.length é menor que 5', () => {
    const response = validateNewProduct({ name: 'Nome' });
    expect(response.type).to.be.equal(422);
  });
  it('Verifica se o retorna corretamente quando campo name está correto', () => {
    const response = validateNewProduct({ name: 'Nome Grande' });
    expect(response.type).to.be.equal(null);
  });

  it('Verifica se insere corretamente um novo prodto', async () => {
    const mockId = 5;
    const mockName = 'Nome Grande'
    sinon.stub(productsModel, 'insertProduct').resolves(mockId);
    const { type, message } = await productService.insertProduct({
      name: mockName
    });
    expect(type).to.be.equal(null);
    expect(message.id).to.be.equal(mockId)
    expect(message.name).to.be.equal(mockName)
  });
  it('Verifica se não insere quando o nome é inadequado', async () => {
    const mockId = 5;
    const mockName = 'Nome'
    sinon.stub(productsModel, 'insertProduct').resolves(mockId);
    const { type, message } = await productService.insertProduct({
      name: mockName
    });
    expect(!type).to.be.equal(false);
  })
});