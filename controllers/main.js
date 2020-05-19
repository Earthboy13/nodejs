const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');
const PDFDoc = require('pdfkit');

exports.getHome = (req, res, next) => {
    
    res.render('shop/index', {
        docTitle: 'Home',
        path: '/'
    });
}

exports.getOrders = (req, res, next) => {
    
    const path = '/orders', docTitle = 'Orders', script = 'shop/order';
    Order.find({ 'user.userId': req.user._id}).then( orders => {
        res.render(script, {
            docTitle: docTitle,
            orders: orders.reverse(),
            path: path    
        });
    }).catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.getInvoice = (req, res, next) => {
    const orderId = req.params.orderId;
    
    //const path = '/orders', docTitle = 'Orders', script = 'shop/order';
    Order.findOne({ 'user.userId': req.user._id, _id: orderId }).then(order => {
        if(order === null)
        {
            const error = new Error('No order found.');
            error.httpStatusCode = 402;
            return next(error);
        }
                /* fs.readFile(invoicePath, (err, data) => {
            if (err) {
                console.log(err);
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            }
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceFile + '"');
            res.send(data);

        }); -- too slow */
        const invoiceFile = 'invoice-' + orderId + '.pdf';
        const invoicePath = path.join('data', 'invoices', invoiceFile);

        const pdfDoc = new PDFDoc();
        pdfDoc.pipe(fs.createWriteStream(invoicePath));



        //const file = fs.createReadStream(invoicePath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + invoiceFile + '"');
        pdfDoc.pipe(res);

        pdfDoc.fontSize(26).text('Invoice: #' + order._id, {
            underline: true
        })
        pdfDoc.text('------------------');
        order.items.forEach(item => {
            pdfDoc.fontSize(14).text(item.product.title + ' - ' + item.qty + ' x $' + item.product.price);
        })
        pdfDoc.fontSize(26).text('------------------');
        pdfDoc.fontSize(20).text('Total: $' + order.totalPrice, {
            underline: true
        })
        pdfDoc.end();

    }).catch(err => {

    });
    
}

exports.postOrders = (req, res, next) => {
    console.log('order made');
    
    console.log(req.user);
    
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const items = user.cart.items.map(item =>{
                return { qty: item.qty, product: { ...item.productId._doc } };
            }); 
            const order = new Order({
                user:{
                    email: req.user.email,
                    username: req.user.username,
                    userId: req.user._id,
                },
                totalPrice: user.cart.totalPrice,
                items: items
            });
            console.log('Order added');
            return order.save();
        })
        .then(() =>{
            return req.user.emptyCart();
        })
        .then(() => {
            res.status(201).redirect('/orders');
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.getAllProducts = (req, res, next) => {
    let page = req.query.page || 1;
    //console.log(page);
    
    const ITEM_PER_PAGE = 2;
    let totalProducts;
    const path = '/products', docTitle = 'Shop', script = 'shop/product-list';
    Product.find().countDocuments().then(result => {
        totalProducts = result;
        return Product.find()
            .skip((page - 1) * ITEM_PER_PAGE)
            .limit(ITEM_PER_PAGE);
    }).then(products => {
        //console.log('find all');  
        //console.log(products);
        res.render(script, {
            prods: products,
            docTitle: docTitle,
            path: path,
            totalProducts: totalProducts,
            hasNextPage: (totalProducts > (page * ITEM_PER_PAGE)),
            hasPreviousPage: page > 1,
            currentPage: page,
            nextPage: page - 1 + 2,
            previousPage: page - 1,
            lastPage: Math.ceil(totalProducts/ ITEM_PER_PAGE)
        });
    }).catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
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
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

