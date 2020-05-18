exports.notFound = (req, res, next) => {
    //filePath = path.join(rootDir, 'views', '404.html');
    res.status(404).render('404', { docTitle: "Page Not Found", path: '' });
}

exports.somethignWentWrong = (req, res, next) => {
    //filePath = path.join(rootDir, 'views', '404.html');
    res.status(500).render('500', { docTitle: "Oops", path: '' });
}