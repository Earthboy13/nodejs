const express = require('express'),
      prodControl = require('../controllers/products'),
      shopControl = require('../controllers/shop');

const router = express.Router();

router.get('/products', prodControl.getAllProducts);
router.get('/products/:id', prodControl.getProduct);
router.get('/cart', shopControl.getCart);
router.get('/cart/checkout', shopControl.getCheckout);
router.get('/', shopControl.getHome);

exports.routes = router