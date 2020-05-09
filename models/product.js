const fs = require('fs'),
    path = require('path'),
    rootDir = require('../util/path');

const filePath = path.join(rootDir, 'data', 'product.json');

const getProductsFromFile = cb => {
    fs.readFile(filePath, (err, data) => {
        if (!err) {
            console.log(data);
            cb(JSON.parse(data));
        } else {
            console.log(err);
            cb([]);
        }

    });
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log("write" + err);
            }
            );
        });

    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}