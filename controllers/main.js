const Product = require('../models/product');
//const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getHome = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    res.render('shop/index', {
        docTitle: 'Home',
        isLoggedIn: isLoggedIn,
        path: '/',
    });
}

exports.getOrders = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const path = '/orders', docTitle = 'Orders', script = 'shop/order';
    Order.find({ 'user.userId': req.session.user._id}).then( orders => {
        res.render(script, {
            docTitle: docTitle,
            isLoggedIn: isLoggedIn,
            orders: orders.reverse(),
            path: path,
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.postOrders = (req, res, next) => {
    User.findById(req.session.user._id)
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const items = user.cart.items.map(item =>{
                return { qty: item.qty, product: { ...item.productId._doc } };
            }); 
            const order = new Order({
                user:{
                    email: req.session.user.email,
                    username: req.session.user.username,
                    userId: req.session.user._id,
                },
                totalPrice: user.cart.totalPrice,
                items: items
            });
            console.log('Order added');
            return order.save();
        })
        .then(() =>{
            return req.session.user.emptyCart();
        })
        .then(() => {
            res.status(201).redirect('/orders');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getAllProducts = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const path = '/products', docTitle = 'Shop', script = 'shop/product-list';
    //Task.getAll(Product, script, docTitle, path, res);
    Product.find().then(products => {
        //console.log('find all');  
        //console.log(products);
        res.render(script, {
            prods: products,
            isLoggedIn: isLoggedIn,
            docTitle: docTitle,
            path: path
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    const path = '/products', docTitle = 'Shop', script = 'shop/product-detail';
    //Task.getById(Product, script, docTitle, path, req, res);
    Product.findById(req.query.id).then(prod => {
        //console.log(req.body.id);
        //console.log(req.query.id);
        //console.log(prod);
        res.render(script, {
            product: prod,
            isLoggedIn: isLoggedIn,
            docTitle: docTitle,
            path: path
        });
    }).catch(err => {
        console.log(err);
    });
}
