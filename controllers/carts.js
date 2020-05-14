const Task = require('../models/task');
const Product = require('../models/product');
const User = require('../models/user');

exports.getCart = (req, res, next) => {
    
    const path = '/cart', docTitle = 'Cart', script = 'shop/cart';
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user =>{
        //return cart.getProducts();
   // }).then(products => {
        //console.log('find all');  
        // console.log(products);
        user.updateTotal();
        const products = user.cart.items;
        res.render(script, {
            total: user.cart.totalPrice,
            products: products,
            docTitle: docTitle,
            path: path
        });
        
    })
    .then(user => {
        
    })
    .catch(err => {
        console.log(err);
   });


}

exports.postCart = (req, res, next) => {
   
    Product.findById(req.body.id).then(product => {
        return req.user.addToCart(product);
    })
    .then(() => {
        res.status(201).redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    });
}

exports.postReduceFromCart = (req, res, next) => {

    Product.findById(req.body.id).then(product => {
        return req.user.reduceFromCart(product);
    })
        .then(() => {
            res.status(201).redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
}


exports.deleteFromCart = (req, res, next) => {

    Product.findById(req.body.id).then(product => {
        return req.user.removeFromCart(product);
    })
        .then(() => {
            res.status(201).redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Checkout',
        path: '/cart',
    });
}

