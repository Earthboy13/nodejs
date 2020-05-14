module.exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
}


module.exports.getLogin = (req, res, next) => {
    const isLoggedIn = req.get('Cookie').split(';')[1].split('=')[1] === 'true';
    console.log();
    res.render('auth/login', {
        docTitle: 'Login',
        isLoggedIn: isLoggedIn,
        path: '/login',
    });
}