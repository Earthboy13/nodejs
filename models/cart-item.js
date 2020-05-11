const Sequelize = require('sequelize');
const db = require('../util/database');

const CartItem = db.define('cartItem',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        qty: {
            type: Sequelize.INTEGER,
        }

    }
);

module.exports = CartItem;