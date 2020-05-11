const express = require('express'),
    prodControl = require('../controllers/products');

const router = express.Router();
    
router.post('/del-product', prodControl.deleteProduct);
router.get('/add-product', prodControl.getAddProduct);

router.post('/add-product', prodControl.postAddProduct);

router.get('/products', prodControl.getAdminProducts);
router.get('/products/detail', prodControl.getAdminProduct);

router.post('/edit-product', prodControl.postEditProduct);
router.get('/edit-product', prodControl.getEditProduct);


exports.routes = router;
