const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require('../../../src/services');
const productController = require('../../../src/controllers/product.controller');
const { products } = require('./mocks/product.controller.mock');

describe('Verifica a camada controller de product', () => {
  afterEach(sinon.restore);

  it('Verifica a resposta quando é solicitada a lista completa', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getAllProducts').resolves({ type: null, message: products });

    await productController.listAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products);
  });

  it('Verifica quando é feita uma busca por id existente', async () => {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getProductById').resolves({ type: null, message: products[0] });

    await productController.productById(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(products[0]);
  });

  it('Verifica quando é feita uma busca por id inexistente', async () => {
    const res = {};
    const req = { params: { id: 10 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'getProductById').resolves({ type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } });

    await productController.productById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  it('Verifica se insere um novo produto corretamente', async () => {
    const res = {};
    const req = { body: { name: 'Nome Grande' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'insertProduct').resolves({ type: null, message: req.body });

    await productController.insertNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
  });

  it('Verifica se não insere um novo produto inadequado', async () => {
    const res = {};
    const req = { body: { name: 'Nome' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productService, 'insertProduct').resolves({ type: 422, message: '"Name" deve ser maior que 5' });

    await productController.insertNewProduct(req, res);

    expect(res.status).not.to.have.been.calledWith(201);
  });
});