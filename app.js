//const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//function rqListener(req, res)
//http.createServer(rqListener);
// http.createServer(function rqListener(req, res){});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use("/admin",adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    
    res.status(404).send('<h1>Error 404: Page Not Found!</h1>');
});

app.listen(8080);

//const server = http.createServer(app);

//server.listen(8080);