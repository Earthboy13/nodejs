const express = require('express'),
      shopControl = require('../controllers/main'),
      authMiddleWare = require('../middleware/is-auth'),
      cartControl = require('../controllers/carts');

const router = express.Router();
router.get('/cart/checkout/success', authMiddleWare, shopControl.postOrders);
router.get('/cart/checkout/cancel', authMiddleWare, cartControl.getCheckout);
router.get('/cart/checkout', authMiddleWare, cartControl.getCheckout);
// checkout/success
router.post('/cart-delete-item', authMiddleWare, cartControl.deleteFromCart);
router.post('/cart-reduce-item', authMiddleWare, cartControl.postReduceFromCart);
router.get('/cart', authMiddleWare, cartControl.getCart);
router.post('/cart', authMiddleWare, cartControl.postCart);

router.get('/orders', authMiddleWare, shopControl.getOrders);
router.get('/orders/:orderId', authMiddleWare, shopControl.getInvoice);



exports.routes = router