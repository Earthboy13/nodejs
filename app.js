const http = require('http');

const routes = require('./routes');
//function rqListener(req, res)
//http.createServer(rqListener);
// http.createServer(function rqListener(req, res){});

const server = http.createServer(routes.handler);

server.listen(8080);