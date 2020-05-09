

const express = require('express'), 
      path = require('path'),
      adminData = require('./admin'),
      rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(adminData.products);
    filePath = path.join(__dirname, '..', 'views','shop.html');
    res.sendFile(filePath);
});

exports.routes = router