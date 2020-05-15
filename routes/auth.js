const express = require('express'),
      authControl = require('../controllers/auths'),
      router = express.Router()
      
router.get('/login', authControl.getLogin);
router.post('/login', authControl.postLogin);

router.post('/logout', authControl.postLogout);

router.get('/sign-up', authControl.getSignUp);
router.post('/sign-up', authControl.postSignUp);

exports.routes = router;