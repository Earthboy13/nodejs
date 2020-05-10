const fs = require('fs'),
    path = require('path'),
    rootDir = require('../util/path');

const productFilePath = path.join(rootDir, 'data', 'product.json');
const countFilePath = path.join(rootDir, 'data', 'count.json');

const getProductsFromFile = cb => {
    fs.readFile(productFilePath, (err, data) => {
        if (!err) {
            //console.log(data);
            cb(JSON.parse(data));
        } else {
            console.log(err);
            cb([]);
        }

    });
}
const getCountFromFile = cb => {
    fs.readFile(countFilePath, (err, data) => {
        if (!err) {
            //console.log(data);
            cb(JSON.parse(data));
        } else {
            console.log(err);
            cb([]);
        }

    });
}

module.exports = class Product {



    constructor(title, imgUrl, description, price) {
        this.title = title;
        this.imgUrl = imgUrl;
        this.description = description;
        this.price = price;
        getCountFromFile(count => {
            count;
            this.id = ++count;
            fs.writeFile(countFilePath, JSON.stringify(count), (err) => {
                console.log("write" + err);
            }
            );
        });
    }

    save() {
        getProductsFromFile(products => {
            
            products.push(this);
            fs.writeFile(productFilePath, JSON.stringify(products), (err) => {
                console.log("write" + err);
            }
            );
        });
    }
    static edit(title, imgUrl, description, price, id)
    {
        getProductsFromFile(products => {
            products.forEach(prod => {
                //console.log(prod);
                if (prod.id == id) {
                    prod.title = title,
                    prod.imgUrl = imgUrl,
                    prod.price = price,
                    prod.description = description;
                }
            });
            fs.writeFile(productFilePath, JSON.stringify(products), (err) => {
                console.log("write" + err);
            }
            );
        });
    }

    static delete(id) {
        getProductsFromFile(products => {
            let p = [];
            products.forEach(prod => {
                //console.log(prod);
                if (prod.id != id) {
                    p.push(prod);
                }
            });
            fs.writeFile(productFilePath, JSON.stringify(p), (err) => {
                console.log("write" + err);
            }
            );
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}