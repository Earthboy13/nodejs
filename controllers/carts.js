const Task = require('../models/task');
const Product = require('../models/product');
const User = require('../models/user');
const stripe = require('stripe')('sk_test_UGFsuYu1krjrQa4RNJIsYjLg00WpkcvVdF');

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

    let products;
    let total;
    const path = '/checkout', docTitle = 'Checkout', script = 'shop/checkout';
    User.findById(req.user._id).then(user => {
        console.log(req.user);

        return user.populate('cart.items.productId').execPopulate();
    })
        .then(user => {
            user.updateTotal();
            products = user.cart.items;
            total = user.cart.totalPrice;

            return stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: products.map(p => {
                    return {
                        name: p.productId.title,
                        description: p.productId.description,
                        amount: p.productId.price * 100,
                        currency: 'cad',
                        quantity: p.qty
                    };
                }),
                success_url: req.protocol + '://' + req.get('host') + '/cart/checkout/success',
                cancel_url: req.protocol + '://' + req.get('host') + '/cart/checkout/cancel'
            });

            
        }).then(session => {
            res.render(script, {
                total: total,
                products: products,
                docTitle: docTitle,
                path: path, 
                sessionId: session.id
            })
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

