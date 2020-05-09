//const http = require('http');

const express = require('express');
//function rqListener(req, res)
//http.createServer(rqListener);
// http.createServer(function rqListener(req, res){});

const app = express();

app.use('/add-product', (req, res, next) => {
    console.log('In the next middle');
    res.send('<p>Add Product</p>');
});

app.use('/',(req, res, next) => {
    console.log('In the next middle');
    res.send('<p>Hi</p>');
});

app.listen(8080);

//const server = http.createServer(app);

//server.listen(8080);