const express = require('express'),
      authControl = require('../controllers/auths'),
      router = express.Router()
      
router.get('/login', authControl.getLogin);
router.post('/login', authControl.postLogin);

router.post('/logout', authControl.postLogout);

router.get('/sign-up', authControl.getSignUp);
router.post('/sign-up', authControl.postSignUp);

router.get('/reset', authControl.getReset);
router.get('/reset/:token', authControl.getResetToken);
router.post('/reset', authControl.postReset);
router.post('/newpassword', authControl.postNewPassword);

exports.routes = router;