const express = require('express'),
    mainControl = require('../controllers/main');


const router = express.Router();
// /cart-reduce-item
router.get('/products/detail', mainControl.getProduct);
router.get('/products', mainControl.getAllProducts);

router.get('/', mainControl.getHome);

exports.routes = router