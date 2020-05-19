const Product = require('../models/product'),
    fileAction = require('../util/file'),
    { validationResult } = require('express-validator/check');


exports.deleteProduct = (req, res, next) => {
    //req.session.user.destroyProduct({ where: { id: req.body.id } })
    Product.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    .then(result => {
        //console.log(result);
        if (result) {
            console.log(result.imgUrl.slice(1));
            fileAction.deleteFile(result.imgUrl.slice(1));
            res.status(204).json({message: 'Success'});
        }
        else {
            res.status(401).json({ message: 'Unauthuerized' });
        }
        
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Server-side Failure' });
    });
}

exports.postAddProduct = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        let message = errors.array().map(i => {
            return i.msg;
        });
        console.log(message);
        return res.status(422).render('admin/add-product', {
            docTitle: 'Add Product',
            path: '/admin/add-product',
            errorMessage: message,
            oldinput: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                userId: req.user._id
            }
        });
    }

    const param = {
        title: req.body.title,
        imgUrl: '\\' + req.file.path,
        description: req.body.description,
        price: req.body.price,
        userId: req.user._id
    };
    //req.session.user.createProduct(param)
    console.log('\\' + req.file.path);

    const product = new Product(param);
    product.save().then(result => {
        //console.log(result);
        console.log('Product Added');
        res.status(201).redirect('/admin/products');
    }).catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.postEditProduct = (req, res, next) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        let message = errors.array().map(i => {
            return i.msg;
        });
        console.log(message);
        return res.status(422).render('admin/add-product', {
            docTitle: 'Add Product',
            path: '/admin/add-product',
            errorMessage: message,
            product: {
                _id: req.body.id,
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                userId: req.user._id
            }
        });
    }
    
    const param = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    };
    if(req.file)
    {
        param.imgUrl = '\\' + req.file.path;
    }
        
    //req.session.user.updateProduct(param, { where: { id: req.body.id } })
    //const product = new Product(param);
    //product.edit()
    Product.findOneAndUpdate({ _id: req.body.id, userId: req.user._id }, param, { new: false})
    .then(result => {
            if(result)
            {
              fileAction.deleteFile(result.imgUrl.slice(1));
              console.log('again update');
              //console.log(result);
              res.status(202).redirect('/admin/products');  
            }
            else
            {
                res.status(401).redirect('/');
            }
            
        }).catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.getAddProduct = (req, res, next) => {
    
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product',
        errorMessage: [],
        oldinput: {
            title: '',
            description: '',
            price: '',
            userId: ''
        }
    });
}

exports.getEditProduct = (req, res, next) => {
    
    const path = '', docTitle = 'Edit Product', script = 'admin/edit-product';
    //req.session.user.getProducts({ where: { id: req.query.id } })
    Product.findOne({ _id: req.query.id, userId: req.user._id })
    .then(prod => {
        //console.log(req.body.id);
        //console.log(req.query.id);
        console.log(prod);
        if (prod) {
            res.render(script, {
                product: prod,
                docTitle: docTitle,
                path: path,
                errorMessage: []
            });
        }
        else {
            res.status(401).redirect('/');
        }
    }).catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.getAdminProduct = (req, res, next) => {
    
    const path = '/admin/products', docTitle = 'Admin Shop', script = 'admin/product-detail';
    //req.session.user.getProducts({ where: { id: req.query.id } })
    Product.findOne({ _id: req.query.id, userId: req.user._id }).then(prod => {
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

exports.getAdminProducts = (req, res, next) => {
    
    const path = '/admin/products', docTitle = 'Admin Shop', script = 'admin/all-products';
    let page = req.query.page || 1;
    //console.log(page);

    const ITEM_PER_PAGE = 2;
    let totalProducts;
    Product.find({ userId: req.user._id }).countDocuments().then(result => {
        totalProducts = result;
        return Product.find({ userId: req.user._id })
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
            lastPage: Math.ceil(totalProducts / ITEM_PER_PAGE)
        });
    }).catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}
