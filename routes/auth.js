const express = require('express'),
      authControl = require('../controllers/auths'),
      router = express.Router()
      
router.get('/login', authControl.getLogin);
router.post('/login', authControl.postLogin);

exports.routes = router;