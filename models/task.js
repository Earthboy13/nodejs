exports.destroyById = (Obj, id, res, redirect) => {
    Obj.destroy({ where: { id: id } }).then(result => {
        console.log(result);
        res.status(204).redirect(redirect);
    }).catch(err => {
        console.log(err);
    });
}

exports.add = (Obj, param, res, redirect) => {
    Obj.create(param).then(result => {
        console.log(result);
        res.status(201).redirect(redirect);
    }).catch(err => {
        console.log(err);
    });
}

exports.updateById = (Obj, param, id, res, redirect) => {
    Obj.update(param, { where: { id: id} })
        .then(result => {
            console.log(result);
            res.status(202).redirect(redirect);
        }).catch(err => {
            console.log(err);
        });
}

exports.getById = (Obj, script, docTitle, path, req, res) => {
    Obj.findByPk(req.query.id).then(prod => {
        //console.log(req.body.id);
        //console.log(req.query.id);
        //console.log(prod);
        res.render(script, {
            product: prod,
            docTitle: docTitle,
            path: path
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.getAll = (Obj, script, docTitle, path, res) => {
    Obj.findAll().then(products => {
        //console.log('find all');  
       // console.log(products);
        res.render(script, {
            prods: products,
            docTitle: docTitle,
            path: path
        });
    }).catch(err => {
        console.log(err);
    });
}
