const express = require('express'),
    authMiddleWare = require('../middleware/is-auth'),
    prodControl = require('../controllers/products'),
    { check, body } = require('express-validator/check');

const router = express.Router();

validate = [
    body('title')
        .isString().withMessage('Title must be made of letters and/or numbers.')
        .isLength({ min: 3 }).withMessage('Title must be at least 3 charaters long.')
        .isLength({ max: 32 }).withMessage('Title too long.')
        .trim(),
    body('price', 'Invalid price.')
        .isNumeric()
        .isDecimal()
        .custom((value, { req }) => {
            if (value < 0) {
                throw new Error('Invalid price...');
            }
            return true;
        })
        .trim(),
    body('description')
        .isString().withMessage('Description must be made of letters and/or numbers.')
        .isLength({ min: 3 }).withMessage('Description must be at least 3 charaters long.')
        .isLength({ max: 256 }).withMessage('Description too long.')
        .trim()
];
    

router.get('/add-product', authMiddleWare, prodControl.getAddProduct);
router.post('/add-product', authMiddleWare, validate, prodControl.postAddProduct);

router.delete('/products/:id', authMiddleWare, prodControl.deleteProduct);
router.get('/products', authMiddleWare, prodControl.getAdminProducts);
router.get('/products/detail', authMiddleWare, prodControl.getAdminProduct);

router.post('/edit-product', authMiddleWare, validate, prodControl.postEditProduct);
router.get('/edit-product', authMiddleWare, prodControl.getEditProduct);


exports.routes = router;
