const http = require('http');
const fs = require('fs');
//function rqListener(req, res)
//http.createServer(rqListener);
// http.createServer(function rqListener(req, res){});

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method, req.headers);
    //process.exit();
    const url = req.url;
    const method = req.method;
    if (url === '/')
    {
        res.write('<html>');
        res.write('<head><title>NodeJs Message</title></head>');
        res.write('<body>');
        res.write('<form action="/message" method="POST"><input type="text" name="input"><button type=submit>Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method == 'POST')
    {   
        const body = [];
        req.on('data',(chuck) => {
            console.log(chuck);
            body.push(chuck);
        });
        
        return req.on('end', () => {
            const pasredBody = Buffer.concat(body).toString();
            //console.log(pasredBody); 
            const input = pasredBody.split('=')[1];
            fs.writeFile('mesaage.txt', input, () => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        //res.writeHead()
        } );
        
        
        
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>NodeJs Website</title></head>');
    res.write('<body>');
    res.write('<h1>Say</h1>');
    res.write('<p>hi</p>');
    res.write('</body>');
    res.write('</html>');
    res.end();
});

server.listen(8080);