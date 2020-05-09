const express = require('express'),
      prodControl = require('../controllers/products'),
      errorControl = require('../controllers/errors');

const router = express.Router();

router.get('/', prodControl.getAllProducts);

exports.routes = router