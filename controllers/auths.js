const User = require('../models/user'),
    crypto = require('crypto'),
    bcrypt = require('bcryptjs'),
    nodemailer = require('nodemailer'),
    sendgridTransport = require('nodemailer-sendgrid-transport'),

    transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
            api_key: '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'
        }
    }));

module.exports.postLogin = (req, res, next) => {
    let hashed = undefined;
    console.log(req.body.password);
    console.log(req.body.username);



    User.findOne()
        .or([{ email: req.body.username }, { username: req.body.username }])
        .then(user => {
            console.log('user found');

            console.log(user);
            //console.log(user.password);

            if (user === null) {
                req.flash('error', 'Invalid username or password');
                return res.redirect('/login');
            }
            bcrypt.compare(req.body.password, user.password)
                .then(result => {
                    if (result) {
                        req.session.user = user;
                        //console.log(req.user);
                        req.session.isLoggedIn = true;
                        req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    } else {
                        req.flash('error', 'Invalid username or password');
                        res.redirect('/login');
                    }
                }).catch(err => {
                    console.log(err);
                    res.redirect('/login');
                });



        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
}

module.exports.postSignUp = (req, res, next) => {

    let hashed = undefined;

    User.findOne().or({ email: req.body.email }, { username: req.body.username })
        .then(user => {
            if (user !== null) {
                req.flash('error', 'Username or E-mail already in use.');
                return res.redirect('/sign-up');
            }
            console.log('over there');
            console.log(user);
            console.log(req.body.password);

            return bcrypt.hash(req.body.password, 12).then(hash => {
                console.log('over here');
                console.log(hash.toString());
                hashed = hash.toString();
                const param = {
                    username: req.body.username,
                    password: hashed,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    dob: req.body.dob,
                    cart: { cartItem: [], totalPrice: 0 }
                };
                console.log(param);
                return User.create(param);
            })
                .then(result => {
                    console.log('after making user');

                    console.log(result);
                    return User.findOne()
                        .where('username').equals(req.body.username)
                        .where('password').equals(hashed);
                })
                .then(user => {
                    console.log('user found?');

                    console.log(user);
                    req.session.user = user;
                    //console.log(req.user);
                    req.session.isLoggedIn = true;
                    req.session.save(err => {
                        console.log(err);
                        res.redirect('/');
                    });
                    return transporter.sendMail({
                        to: req.body.email,
                        from: 'osmanaibrahim1@gmail.com',
                        subject: 'SignUp',
                        html: '<h1>Welcome to the monkey ninja world.</h1>'
                    });
                })
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};

module.exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });

};

module.exports.getLogin = (req, res, next) => {


    res.render('auth/login', {
        docTitle: 'Login',
        path: '/login',
        errorMessage: req.flash('error')
    });
};

module.exports.getSignUp = (req, res, next) => {


    res.render('auth/login', {
        docTitle: 'Sign Up',
        path: '/sign-up',
        errorMessage: req.flash('error')
    });
};

module.exports.getReset = (req, res, next) => {

    res.render('auth/reset', {
        docTitle: 'Password Reset',
        path: '/reset',
        errorMessage: req.flash('error'),
        resetMessage: req.flash('reset')
    });
};

module.exports.getResetToken = (req, res, next) => {

    const token = req.params.token;
    console.log(token);
    User.findOne({ resetToken: token, resetTokenExp: { $gt: Date.now() } })
        .then(user => {
            if (user)
                res.render('auth/passwordReset', {
                    docTitle: 'Password Reset',
                    path: '/reset',
                    errorMessage: req.flash('error'),
                    resetMessage: req.flash('reset'),
                    userId: user._id.toString(),
                    token: token
                });
            else {
                res.redirect('/404');
            }
        })
        .catch(err => console.log(err))

};

module.exports.postNewPassword = (req, res, next) => {
    let user = null;
    User.findOne({ _id: req.body.id, resetToken: req.body.token, resetTokenExp: { $gt: Date.now() } })
        .then(result => {
            user = result;
            console.log('user found');

            console.log(user);
            console.log(result);
            
            //console.log(user.password);

            if (user === null) {
                return res.redirect('/404');
            }
            bcrypt.hash(req.body.password, 12).then(hash => {
                console.log('over here');
                console.log(hash.toString());
                hashed = hash.toString();
                user.password = hashed;
                user.resetToken = undefined;
                user.resetTokenExp = undefined;
                return user.save();
            }).then(result => {
                return res.redirect('/login');
            })
                .catch(err => console.log(err))
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};

module.exports.postReset = (req, res, next) => {
    let token = undefined;
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                req.flash('error', 'E-mail Does Not Exist.');
                return res.redirect('/reset');
            }

            console.log(user);

            console.log('user found?');

            crypto.randomBytes(32, (err, buffer) => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Something went wrong try again.');
                    return res.redirect('/reset');
                }
                token = buffer.toString('hex');
                console.log(token);
                if (token) {
                    user.resetToken = token;
                    user.resetTokenExp = Date.now() + 900000;
                    console.log('saving token');
                    return user.save()
                        .then(result => {
                            //console.log(req.user);
                            console.log('saved token');
                            req.flash('reset', 'Reset Email has been sent.');
                            res.redirect('/reset');
                            
                            return transporter.sendMail({
                                to: req.body.email,
                                from: 'osmanaibrahim1@gmail.com',
                                subject: 'Password Reset',
                                html: `
                                <p>You request a password reset.</p>
                                <p>CLick link to reset password. Link expries in 15 minutes.</p>
                                <a href="http://localhost/reset/${token}">Reset</a>
                                `
                            });

                        });
                } else {
                    req.flash('error', 'Something went really wrong try again.');
                    return res.redirect('/reset');
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });

};