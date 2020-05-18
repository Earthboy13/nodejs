const express = require('express'),
      authControl = require('../controllers/auths'),
      router = express.Router(),
      User = require('../models/user'),
      { check, body } = require('express-validator/check');
      
router.get('/login', authControl.getLogin);
router.post('/login',[
    body('username')
        .trim(),
    body('password', 'Invalid username or password')
        .isAlphanumeric().trim().isLength({ min: 8 })
        .custom((value, { req }) => {
            if (value === value.toUpperCase() || value === value.toLowerCase()) {
                throw new Error('Invalid username or password');
            }

            return true;
        })
    
], authControl.postLogin);

router.post('/logout', authControl.postLogout);

router.get('/sign-up', authControl.getSignUp);
router.post('/sign-up', [
    body('email', 'Please Enter a valid email.')
        .isEmail().custom((value, { req }) => {
            return User.findOne({ email: value }).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use.');
                }
            })
                .catch(err => console.log(err))

            return true;
        }).trim().normalizeEmail(), 
    body('password', 'Password most be at least 8 charaters long containing at least one upper and lower case letter, and one number.')
        .isAlphanumeric().trim().isLength({ min: 8 })
        .custom((value, { req }) => {
            if (value === value.toUpperCase() || value === value.toLowerCase()) {
                throw new Error('Password most be at least 8 charaters long containing at least one upper and lower case letter, and one number.');
            }
            
            return true;
        }),
    body('cpassword', 'Password does not match confirm password')
        .custom((value, { req }) => {
                        if (value !== req.body.password) {
                throw new Error('Password does not match confirm password');
            }

            return true;
        }),
    body('username', 'Username have numbers and letters only and must be between 4 - 16 charaters long.')
        .isAlphanumeric().trim().isLength({ min: 4, max: 16 }).custom((value, { req }) => {
            return User.findOne({ username: value }).then(user => {
                if (user) {
                    return Promise.reject('Username already in use.');
                }
            })
                .catch(err => console.log(err))

            return true;
        }),
    body('dob', 'DOB most be in the past')
        .isBefore()
        .custom((value, { req }) => {
            const  date = new Date();
            const dob = new Date(value);
            date.setFullYear(date.getFullYear() - 13);
/*             console.log('-----------');
            console.log(date);
            console.log(typeof date);
            console.log(value);
            console.log(typeof value);
            console.log(dob);
            console.log(typeof dob);
            console.log('-----------');
            console.log(value < date);
            console.log(value > date);
            console.log(value >= date);
            console.log('-----------');
            console.log(dob < date);
            console.log(dob > date);
            console.log(dob >= date);
            console.log('-----------'); */
            if(dob > date)
            {
                throw new Error('You Must 13 years of age or older.');
            }
            return true;
        }).trim()
    ], authControl.postSignUp);

router.get('/reset', authControl.getReset);
router.get('/reset/:token', authControl.getResetToken);
router.post('/reset', authControl.postReset);
router.post('/newpassword', authControl.postNewPassword);

exports.routes = router;