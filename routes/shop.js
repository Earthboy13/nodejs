const express = require('express'),
      shopControl = require('../controllers/main');

const router = express.Router();

router.get('/products', shopControl.getAllProducts);
router.get('/products/detail', shopControl.getProduct);
router.get('/cart', shopControl.getCart);
router.get('/cart/checkout', shopControl.getCheckout);
router.get('/', shopControl.getHome);

exports.routes = router