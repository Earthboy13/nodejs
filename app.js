const http = require('http');


//function rqListener(req, res)
{

}

//http.createServer(rqListener);


// http.createServer(function rqListener(req, res){});
const server = http.createServer((req, res) => {
    console.log(req);
});

server.listen(8080);