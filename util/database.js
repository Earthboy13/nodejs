const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3308,
    user: 'root',
    database: 'nodejs',
    password: ''
});

module.exports = pool.promise();