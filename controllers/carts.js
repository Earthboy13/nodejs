const Task = require('../models/task');
const Product = require('../models/product');
const User = require('../models/user');

exports.getCart = (req, res, next) => {
    
    const path = '/cart', docTitle = 'Cart', script = 'shop/cart';
    User.findById(req.user._id).then(user => {
        console.log(req.user);
        
        return user.populate('cart.items.productId').execPopulate();
    })
    .then(user =>{
        user.updateTotal();
        const products = user.cart.items;
        res.render(script, {
            total: user.cart.totalPrice,
            products: products,
            docTitle: docTitle,
            path: path
        });
        
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
   });


}

exports.postCart = (req, res, next) => {
   
    Product.findById(req.body.id).then(product => {
        
    User.findById(req.user._id)
        .then(user => {
            return user.addToCart(product);
        })
    
    })
    .then(() => {
        res.status(201).redirect('/cart');
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.postReduceFromCart = (req, res, next) => {

    Product.findById(req.body.id).then(product => {
        User.findById(req.user._id)
            .then(user => {
                return user.reduceFromCart(product);
            })
        
    })
        .then(() => {
            res.status(201).redirect('/cart');
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}


exports.deleteFromCart = (req, res, next) => {

    Product.findById(req.body.id).then(product => {
        User.findById(req.user._id)
            .then(user => {
                return user.removeFromCart(product);
            })
    })
        .then(() => {
            res.status(201).redirect('/cart');
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/cart', {
        docTitle: 'Checkout',
        isLoggedIn: req.isLoggedIn,
        path: '/cart'
    });
}

