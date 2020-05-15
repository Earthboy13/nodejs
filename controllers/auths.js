const User = require('../models/user'),
bcrypt = require('bcryptjs');

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
                return res.redirect('/login');
            }
            bcrypt.compare(req.body.password,user.password)
            .then(result => {
                if(result)
                {
                    req.session.user = user;
                    //console.log(req.user);
                    req.session.isLoggedIn = true;
                    req.session.save(err => {
                        console.log(err);
                        res.redirect('/');
                    });
                }else
                {
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

                })
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
}

module.exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);

        res.redirect('/');
    });

}

module.exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    //console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        docTitle: 'Login',
        isLoggedIn: isLoggedIn,
        path: '/login',
    });
}

module.exports.getSignUp = (req, res, next) => {
    const isLoggedIn = req.session.isLoggedIn;
    //console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        docTitle: 'Sign Up',
        isLoggedIn: isLoggedIn,
        path: '/sign-up',
    });
}