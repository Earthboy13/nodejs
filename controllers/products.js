const Product = require('../models/product');
const Task = require('../models/task');

exports.deleteProduct = (req, res, next) => {
    Task.destroyById(Product, req, res, '/admin/products');
}

exports.postAddProduct = (req, res, next) => {
    Task.add(Product, req, res, '/admin/products');
}

exports.postEditProduct = (req, res, next) => {
    Task.updateById(Product, req, res, '/admin/products');
}

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        docTitle: 'Add Product',
        path: '/admin/add-product'
    });
}

exports.getEditProduct = (req, res, next) => {
    const path = '', docTitle = 'Edit Product', script = 'admin/edit-product';
    Task.getById(Product, script, docTitle, path, req, res);
}

exports.getAdminProduct = (req, res, next) => {
    const path = '/admin/products', docTitle = 'Admin Shop', script = 'admin/product-detail';
    Task.getById(Product, script, docTitle, path, req, res);
}

exports.getAdminProducts = (req, res, next) => {
    const path = '/admin/products', docTitle = 'Admin Shop', script = 'admin/all-products';
    Task.getAll(Product, script, docTitle, path, res);
}
