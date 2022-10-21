const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', productController.listAllProducts);

router.get('/:id', productController.productById);

router.post('/', productController.insertNewProduct);

router.put('/:id', productController.updateProduct);

module.exports = router;
