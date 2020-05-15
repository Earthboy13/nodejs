const express = require('express'),
    authMiddleWare = require('../middleware/is-auth'),
    prodControl = require('../controllers/products');

const router = express.Router();
    
router.post('/del-product', authMiddleWare, prodControl.deleteProduct);
router.get('/add-product', authMiddleWare, prodControl.getAddProduct);

router.post('/add-product', authMiddleWare, prodControl.postAddProduct);

router.get('/products', authMiddleWare, prodControl.getAdminProducts);
router.get('/products/detail', authMiddleWare, prodControl.getAdminProduct);

router.post('/edit-product', authMiddleWare, prodControl.postEditProduct);
router.get('/edit-product', authMiddleWare, prodControl.getEditProduct);


exports.routes = router;
