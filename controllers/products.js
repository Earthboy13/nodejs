const Product = require('../models/product');


exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title,
        imgUrl = req.body.imgUrl,
        price = req.body.price,
        description = req.body.description;
    const product = new Product(title, imgUrl, description, price);
    product.save();
    res.status(201).redirect('/products');
}

exports.getEditProduct = (req, res, next) => {
    Product.fetchAll(products => {
        //console.log(req.params.id);
        let found = false;
        products.forEach(prod => {
            console.log(prod);
            if (prod.id == req.params.id) {
                console.log('found' + prod);
                found = true;
                res.render('admin/edit-product', {
                    product: prod,
                    docTitle: 'Edit Product',
                    path: ''
                });
            }
        });
        if (!found) {
            next();
        }
    });
}

exports.postEditProduct = (req, res, next) => {
    Product.edit(req.body.title,
        req.body.imgUrl,
        req.body.price,
        req.body.description,
        req.params.id);

    res.status(201).redirect('admin/products/' + req.params.id);
}

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        //console.log(req.params.id);
        let found = false;
        products.forEach(prod => {
            console.log(prod);
            if (prod.id == req.params.id) {
                console.log('found' + prod);
                found = true;
                res.render('shop/product-detail', {
                    product: prod,
                    docTitle: 'Shop',
                    path: '/products'
                });
            }
        });
        if (!found) {
            next();
        }
    });

}


exports.getAllProducts = (req, res, next) => {
    Product.fetchAll(products => {
        //console.log(products);

        res.render('shop/product-list', {
            prods: products,
            docTitle: 'Shop',
            path: '/products'
        });
    });

}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        //console.log(products);

        res.render('admin/all-products', {
            prods: products,
            docTitle: 'Shop',
            path: '/products'
        });
    });

}