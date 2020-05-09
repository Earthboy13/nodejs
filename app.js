//const http = require('http');

const express = require('express'), 
      path = require('path'), 
      bodyParser = require('body-parser'), 
      adminRoutes = require('./routes/admin'), 
      shopRoutes = require('./routes/shop'),
      rootDir = require('./util/path');
//function rqListener(req, res)
//http.createServer(rqListener);
// http.createServer(function rqListener(req, res){});

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use("/admin",adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    filePath = path.join(rootDir, 'views', '404.html');
    res.status(404).sendFile(filePath);
});

app.listen(8080);

//const server = http.createServer(app);

//server.listen(8080);