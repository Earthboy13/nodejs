const express = require('express'), 
      path = require('path'), 
      rootDir = require('../util/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    filePath = path.join(__dirname, '..', 'views', 'add-product.html');
    res.sendFile(filePath);
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.status(201).redirect('/');
});


module.exports = router