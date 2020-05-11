const Sequelize = require('sequelize');
const db = require('../util/database');

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

module.exports = User;