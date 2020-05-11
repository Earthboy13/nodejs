const Sequelize = require('sequelize');
const db = require('../util/database');

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

module.exports = Product;