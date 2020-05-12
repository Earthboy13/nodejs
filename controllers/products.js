const Product = require('../models/product');


exports.deleteProduct = (req, res, next) => {
    //req.user.destroyProduct({ where: { id: req.body.id } })
    Product.deleteById(req.body.id)
    .then(result => {
        //console.log(result);
        res.status(204).redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
}

exports.postAddProduct = (req, res, next) => {
    const param = {
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        price: req.body.price
    };
    //req.user.createProduct(param)
    const product = new Product(param);
    product.save().then(result => {
        //console.log(result);
        res.status(201).redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    });
}

exports.postEditProduct = (req, res, next) => {
    const param = {
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        price: req.body.price,
        id: req.body.id
    };
    //req.user.updateProduct(param, { where: { id: req.body.id } })
    const product = new Product(param);
    product.edit().then(result => {
            console.log('again update');
            //console.log(result);
            res.status(202).redirect('/admin/products');
        }).catch(err => {
            console.log(err);
        });
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

exports.getEditProduct = (req, res, next) => {
    const path = '', docTitle = 'Edit Product', script = 'admin/edit-product';
    //req.user.getProducts({ where: { id: req.query.id } })
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

exports.getAdminProduct = (req, res, next) => {
    const path = '/admin/products', docTitle = 'Admin Shop', script = 'admin/product-detail';
    //req.user.getProducts({ where: { id: req.query.id } })
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

exports.getAdminProducts = (req, res, next) => {
    const path = '/admin/products', docTitle = 'Admin Shop', script = 'admin/all-products';
    //req.user.getProducts()
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
