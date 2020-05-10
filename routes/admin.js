const express = require('express'),
    prodControl = require('../controllers/products');

const router = express.Router();
    

router.get('/add-product', prodControl.getAddProduct);

router.post('/add-product', prodControl.postAddProduct);

router.get('/products', prodControl.getAdminProducts);

router.get('/edit-product/:id', prodControl.getEditProduct);
router.post('/edit-product/:id', prodControl.postEditProduct);


exports.routes = router;
