const express = require('express'),
    prodControl = require('../controllers/products');

const router = express.Router();
    

router.get('/add-product', prodControl.getAddProduct);

router.post('/add-product', prodControl.postAddProduct);


exports.routes = router;
