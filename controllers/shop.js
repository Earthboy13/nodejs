exports.getHome = (req, res, next) => {
    res.render('shop/index', {
        docTitle: 'Home',
        path: '/',
    });
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
