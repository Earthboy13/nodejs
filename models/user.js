// const Sequelize = require('sequelize');
// const db = require('../util/database');
//const getDb = require('../util/database').getDb;
//const mongoDb = require('mongodb');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            }
        }],
        totalPrice: {
            type: Number,
            required: true
        }
    }
});

userSchema.methods.addToCart = function (product) {
    const user = this;
    const listOfItems = user.cart.items;
    if (listOfItems.length == 0) {
        console.log('add to cart');
        user.cart.items[0] =
        {
            productId: product._id,
            qty: 1
        };
        user.cart.totalPrice = product.price;
        return user.save();
    }
    let check = false;
    user.cart.items
        .forEach(item => {
            if (item.productId.toString() === product._id.toString()) {
                console.log('add to cart');
                item.qty = ++item.qty;
                user.cart.totalPrice = user.cart.totalPrice + product.price;
                check = true;
                return user.save();
            }
        });

    if (!check) {
        console.log('add to cart');
        user.cart.items[listOfItems.length] =
        {
            productId: product._id,
            qty: 1
        };
        user.cart.totalPrice = user.cart.totalPrice + product.price;
        return user.save();
    }
    console.log('Something went wrong while trying to add to cart.');


}

userSchema.methods.removeFromCart = function (product) {
    const user = this;
    user.cart.items
        .forEach(item => {
            if (item.productId.toString() === product._id.toString()) {
                user.cart.totalPrice = (user.cart.totalPrice*100 - (product.price * 100 * item.qty))/100;
            }
        });
    user.cart.items = user.cart.items.filter(
        item => {
            return item.productId.toString() !== product._id.toString();
        }
    );
    console.log('removed from cart');
    
    return user.save();
    console.log('Something went wrong while trying to remove from cart.');


}


userSchema.methods.emptyCart = function () {
    const user = this;
    
    user.cart.items = [];
    user.cart.totalPrice = 0;

    console.log('empty cart');

    return user.save();
    console.log('Something went wrong while trying to remove from cart.');


}

userSchema.methods.updateTotal = function() {
    let newTotal = 0;
    this.populate('cart.items.productId')
        .execPopulate()
        .then(user => 
        {
            user.cart.items
                .forEach(item => {
                    newTotal = newTotal + (item.productId.price * item.qty);
                });
            user.cart.totalPrice = newTotal;
            return user.save();
        }).catch(err => {
                console.log(err);
        });
        
}

userSchema.methods.reduceFromCart = function (product) {
    const user = this;
    console.log(product._id);
    const listOfItems = user.cart.items;
    if (listOfItems.length == 0) {
        console.log('nothing to reduce from cart. cart is empty.');
        return Promise.resolve(user);
    }
    let check = false;
    let remove = true;
    user.cart.items
        .forEach(item => {
            if (item.productId.toString() === product._id.toString()) {
                check = true;
                if (item.qty > 1) {
                    console.log('reduced from cart');
                    item.qty = --item.qty;
                    user.cart.totalPrice = user.cart.totalPrice - product.price;
                    remove = false;
                    return user.save();
                }
            }
        });
    if(check && remove)
    {
    console.log('reduced and removed from cart');
    user.cart.items = user.cart.items.filter(
        item => {
            return item.productId.toString() !== product._id.toString();
        }
    );
    user.cart.totalPrice = user.cart.totalPrice - product.price;
    return user.save();
    }
    return Promise.resolve(user);
    console.log('Something went wrong while trying to add to cart.');


}

module.exports = mongoose.model('User', userSchema);

/*
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
 const User = db.define('user',
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