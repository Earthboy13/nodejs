const http = require('http');

const express = require('express');
//function rqListener(req, res)
//http.createServer(rqListener);
// http.createServer(function rqListener(req, res){});

const app = express();

const server = http.createServer(app);

server.listen(8080);