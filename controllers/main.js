const Product = require('../models/product');
//const Cart = require('../models/cart');
const Task = require('../models/task');

exports.getHome = (req, res, next) => {
    res.render('shop/index', {
        docTitle: 'Home',
        path: '/',
    });
}

exports.getAllProducts = (req, res, next) => {
    const path = '/products', docTitle = 'Shop', script = 'shop/product-list';
    //Task.getAll(Product, script, docTitle, path, res);
    Product.fetchAll().then(products => {
        //console.log('find all');  
        //console.log(products);
        res.render(script, {
            prods: products,
            docTitle: docTitle,
            path: path
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const path = '/products', docTitle = 'Shop', script = 'shop/product-detail';
    //Task.getById(Product, script, docTitle, path, req, res);
    Product.findById(req.query.id).then(prod => {
        //console.log(req.body.id);
        //console.log(req.query.id);
        //console.log(prod);
        res.render(script, {
            product: prod,
            docTitle: docTitle,
            path: path
        });
    }).catch(err => {
        console.log(err);
    });
}

