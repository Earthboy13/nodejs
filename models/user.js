// const Sequelize = require('sequelize');
// const db = require('../util/database');
const getDb = require('../util/database').getDb;
const mongoDb = require('mongodb');

module.exports = class User {
    constructor(param) {
        this.username = param.username;
        this.first_name = param.first_name;
        this.last_name = param.last_name;
        this.email = param.email;
        this.dob = param.dob;
        this.cart = param.cart ? mongoDb.ObjectId(param.cart) : { cartItem: [], totalPrice: 0 };
        this._id = param.id ? mongoDb.ObjectId(param.id) : undefined;
    }
    save() {
        const db = getDb();
        return db.collection('users')
            .insertOne(this)
            .then(result => {
                console.log('Save');
                //console.log(result);
            }).catch(err => console.log(err));

    }
    addToCart(product) {
        User.findById(this._id).then(obj => {
            const user = new User({...obj});
            const listOfItems = user.cart.cartItem;
            if (listOfItems.length == 0) {
                console.log('add to cart');
                user.cart.cartItem[0] =
                {
                    ...product,
                    qty: 1
                };
                user.cart.totalPrice = product.price;
                return user.updateCart();
            }
            let check = false;
            user.cart.cartItem
            .forEach(item => {
                if (item._id === product._id)
                {
                    console.log('add to cart');
                    item.qty = ++item.qty;
                    user.cart.totalPrice = user.cart.totalPrice + product.price;
                    check = true;
                    return user.updateCart();
                }
            });
            
            if(!check)
            {
                console.log('add to cart');
                user.cart.cartItem[listOfItems.length] =
                {
                    ...product,
                    qty: 1
                };
                user.cart.totalPrice = user.cart.totalPrice + product.price;
                return user.updateCart();
            }
            console.log('Something went wrong while trying to add to cart.');

        }
        ).catch(err => console.log(err));
    }
    edit() {
        const db = getDb();
        //console.log(this._id);
        return db.collection('users')
            .updateOne(
                { _id: this._id },
                { $set: this }
            )
            .then(result => {
                console.log('update');
                //console.log(result);
            }).catch(err => console.log(err));
    }
    updateCart() {
        const db = getDb();
        //console.log(this._id);
        return db.collection('users')
            .updateOne(
                { _id: this._id },
                { $set: {cart: this.cart} }
            )
            .then(result => {
                console.log('update');
                //console.log(result);
            }).catch(err => console.log(err));
    }

    static deleteById(id) {
        const db = getDb();
        return db.collection('users')
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
        return db.collection('users')
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
        return db.collection('users')
            .find({ _id: mongoDb.ObjectId(id) })
            .next()
            .then(result => {
                console.log('find by id');
                console.log(id);
                //console.log(result);
                return result;
            }).catch(err => console.log(err));
    }
}
/* const User = db.define('user',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        username: {
            type: Sequelize.STRING(26),
            allowNull: false
        },
        first_name: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING(32),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(50),
            allowNull: false,
            isEmail: true
        },
        dob: {
            type: Sequelize.DATE,
            allowNull: false,
            isDate: true,
            isBefore: Sequelize.NOW,
        }
    }
);

module.exports = User; */