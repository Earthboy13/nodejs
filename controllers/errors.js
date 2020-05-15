exports.notFound = (req, res, next) => {
    //filePath = path.join(rootDir, 'views', '404.html');
    res.status(404).render('404', { docTitle: "Page Not Found", isLoggedIn: req.isLoggedIn, path: '' });
}