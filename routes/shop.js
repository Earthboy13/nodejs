

const express = require('express'), 
      path = require('path'),
      rootDir = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    filePath = path.join(__dirname, '..', 'views','shop.html');
    res.sendFile(filePath);
});

module.exports = router