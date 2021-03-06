//const Sequelize = require('sequelize');
//const db = require('../util/database');
//const getDb = require('../util/database').getDb;
//const mongoDb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);


/* 
module.exports = class Product {

    constructor(param, userId) {
        this.title = param.title;
        this.imgUrl = param.imgUrl;
        this.description = param.description;
        this.price = param.price;
        this._id = param.id ? mongoDb.ObjectId(param.id) : undefined;
        this.userId = userId;
    }

    save() {  
        const db = getDb();
        return db.collection('products')
        .insertOne(this)
        .then(result => {
            console.log('Save');
            //console.log(result);
        }).catch(err => console.log(err));
       
    }
    edit() {
        const db = getDb();
        //console.log(this._id);
        return db.collection('products')
            .updateOne(
                { _id: this._id },
                { $set: this }
             )
            .then(result => {
                console.log('update');
                //console.log(result);
            }).catch(err => console.log(err));
    }

    static deleteById(id) {
        const db = getDb();
        return db.collection('products')
            .deleteOne({ _id: mongoDb.ObjectId(id) })
            .then(result => {
                console.log('delete by id');
                console.log(id);
                //console.log(result);
                return result;
            }).catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(result => {
            console.log('Find All');
            //console.log(result);
            return result;
        }).catch(err => console.log(err));
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products')
            .find({ _id: mongoDb.ObjectId(id)})
            .next()
            .then(result => {
                console.log('find by id');
                console.log(id);
                //console.log(result);
                return result;
            }).catch(err => console.log(err));
    }
}
 */

/*
const Product = db.define('product',
{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        min: 0,
        isNumeric: true
    },
    imgUrl:{
        type: Sequelize.STRING,
        allowNull: false,
        isUrl: true
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
}
);
*/