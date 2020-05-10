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
    product.save()
        .then(result => {
            console.log(result[0]);
            res.status(201).redirect('/admin/products')
        }).catch(err => {
            console.log(err);
        });
}

exports.getEditProduct = (req, res, next) => {  
    Product.findById(req.params.id).then(([prod]) => {
            //console.log(req.params.id);
                console.log(prod[0]);
                found = true;
                res.render('admin/edit-product', {
                    product: prod[0],
                    docTitle: 'Edit Product',
                    path: ''
                });

    }).catch(err => {
        console.log(err);
    });
}

exports.postEditProduct = (req, res, next) => {
    Product.edit(req.body.title,
        req.body.imgUrl,
        req.body.description,
        req.body.price,
        req.params.id).then(result => {
            console.log(result[0]);
            res.status(202).redirect('/admin/products/' + req.params.id);
        }).catch(err => {
            console.log(err);
        });
}

exports.getProduct = (req, res, next) => {
    Product.findById(req.params.id).then(([prod, sysData])=> {
        //console.log(req.params.id);
        console.log(prod[0]);

        res.render('shop/product-detail', {
            product: prod[0],
            docTitle: 'Shop',
            path: '/products'
        });

    }).catch(err => {
        console.log(err);
    });
}

exports.getAdminProduct = (req, res, next) => {
    Product.findById(req.params.id).then(([prod, sysData]) => {
        //console.log(req.params.id);
        console.log(prod[0]);

        res.render('admin/product-detail', {
            product: prod[0],
            docTitle: 'Admin Shop',
            path: '/admin/products'
        });

    }).catch(err => {
        console.log(err);
    });
}

exports.getAllProducts = (req, res, next) => {
    Product.fetchAll().then(([products, sysData]) => {
        //console.log(products);

        res.render('shop/product-list', {
            prods: products,
            docTitle: 'Shop',
            path: '/products'
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.deleteProduct = (req, res, next) => {
    Product.delete(req.params.id).then(result => {
        console.log(result[0]);
        res.status(204).redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll().then(([products, sysData])  => {
        //console.log(products);

        res.render('admin/all-products', {
            prods: products,
            docTitle: 'Admin Shop',
            path: '/admin/products'
        });
    }).catch(err => {
        console.log(err);
    });

}