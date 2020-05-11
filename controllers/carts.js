const Task = require('../models/task');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getCart = (req, res, next) => {
    
    const path = '/cart', docTitle = 'Cart', script = 'shop/cart';
    req.user.getCart()
    .then(cart =>{
        return cart.getProducts();
    }).then(products => {
        //console.log('find all');  
        // console.log(products);
        res.render(script, {
            products: products,
            docTitle: docTitle,
            path: path
        });
    })
    .catch(err => {
        console.log(err);
    });


}

exports.postCart = (req, res, next) => {
    let myCart;
    req.user.getCart()
        .then(cart => {
            myCart = cart;
            return cart.getProducts({ where: { id: req.body.id } });
        }).then(products => {
            //console.log('find all');  
            // console.log(products);
            if(products.length > 0)
            {  
                return myCart.addProduct(products[0], {
                    through: {
                        qty: ++products[0].cartItem.qty
                    }
                });
            }
            let qty = 1;
            return Product.findByPk(req.body.id)
                    .then(product => {
                        return myCart.addProduct(product, { through: {
                            qty: qty
                        }});
                    })
                    .catch(err => {
                        console.log(err);
                    });
            
        }).then(() => {
            res.status(201).redirect('/cart');
        })
        .catch(err => {
            console.log(err);
        });
}
exports.deleteFromCart = (req, res, next) => {
    let myCart;
    req.user.getCart()
        .then(cart => {
            myCart = cart;
            return cart.getProducts({ where: { id: req.body.id } });
        }).then(products => {
            //console.log('find all');  
            // console.log(products);
            if (products.length > 1) {
                return myCart.addProduct(products[0], {
                    through: {
                        qty: --products[0].cartItem.qty
                    }
                });
            }
            return products[0].cartItem.destory();

        }).then(() => {
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

