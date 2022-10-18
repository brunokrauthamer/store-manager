const express = require('express');
const driverController = require('../controllers/product.controller');

const router = express.Router();

router.get('/', driverController.listAllProducts);

router.get('/:id', driverController.productById);

router.post('/', driverController.insertNewProduct);

module.exports = router;
