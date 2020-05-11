const Product = require('../models/product');
const Cart = require('../models/cart');
const Task = require('../models/task');

exports.getHome = (req, res, next) => {
    res.render('shop/index', {
        docTitle: 'Home',
        path: '/',
    });
}

exports.getAllProducts = (req, res, next) => {
    const path = '/products', docTitle = 'Shop', script = 'shop/product-list';
    Task.getAll(Product, script, docTitle, path, res);
}

exports.getProduct = (req, res, next) => {
    const path = '/products', docTitle = 'Shop', script = 'shop/product-detail';
    Task.getById(Product, script, docTitle, path, req, res);
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Cart',
        path: '/cart',
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Checkout',
        path: '/cart',
    });
}
