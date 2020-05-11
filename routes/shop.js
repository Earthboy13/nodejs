const express = require('express'),
      shopControl = require('../controllers/main'),
      cartControl = require('../controllers/carts');

const router = express.Router();

router.get('/products/detail', shopControl.getProduct);
router.get('/products', shopControl.getAllProducts);
router.get('/cart/checkout', cartControl.getCheckout);
router.get('/cart', cartControl.getCart);
router.post('/cart', cartControl.postCart);
router.post('/cart-delete-item', cartControl.deleteFromCart);
router.get('/', shopControl.getHome);

exports.routes = router