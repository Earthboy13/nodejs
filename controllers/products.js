const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeProduct: true
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.status(201).redirect('/');
}

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        console.log(products);

        res.render('shop/product-list', {
            prods: products,
            docTitle: 'My Shop',
            path: '/',
            hasProducts: products.length > 0,
            productCSS: true,
            activeShop: true
        });
    });

}