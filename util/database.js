/*const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs', 'root', '', {
    host: 'localhost',
    port: 3308,
    dialect: 'mysql'
});

module.exports = sequelize;*/
//useUnifiedTopology: true
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
let _db;
const uri = "mongodb+srv://Earthboy13:0E23C784@nodejs-db-orfyf.gcp.mongodb.net/nodejs?retryWrites=true&w=majority";
/* const client = cb  => { 
    MongoClient.connect(
        uri, { useNewUrlParser: true, useUnifiedTopology: true }
        ).then(result => {
            console.log('Connected');
            _db = result.db();
            cb();
        })
        .catch(err => {console.log(err); throw err;});
} */

const getDb = () => {
    if(_db)
        return _db;
    throw 'No Database';
}

exports.client = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
exports.getDb = getDb;