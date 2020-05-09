const fs = require('fs'), path = require('path');




const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>NodeJs Website</title></head>');
        res.write('<body>');
        res.write('<h1>Say</h1>');
        res.write('<p>hi</p>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }

    if (url === '/create-user') {
        res.write('<html>');
        res.write('<head><title>NodeJs Message</title></head>');
        res.write('<body>');
        res.write('<form action="/submit" method="POST"><input type="text" name="user"><button type=submit>Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/submit' && method == 'POST') {
        const body = [];
        req.on('data', (chuck) => {
            console.log(chuck);
            body.push(chuck);
        });

        return req.on('end', () => {
            const pasredBody = Buffer.concat(body).toString();
            //console.log(pasredBody); 
            const user = pasredBody.split('=')[1];
            fs.appendFile('user.txt', '<li>' + user + '</li>', () => {
                res.statusCode = 302;
                res.setHeader('Location', '/user');
                return res.end();
            });
            //res.writeHead()
        });

    }
    if (url === '/user') {
        //let input;
        //const body = [];
        filePath = path.join(__dirname, 'user.txt');
        fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
            if(!err){
            console.log(data);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.write('<html>');
            res.write('<head><title>NodeJs Users</title></head>');
            res.write('<body>');
            res.write('<ul>');
            res.write(data);
            res.write('</ul>');
            res.write('</body>');
            res.write('</html>');
            res.end();
            //body.push(data);
            } else {
                console.log(err);
            }
        });
        //console.log(body);
        //const users = Buffer.concat(body).toString;

        
    }


};



// module.exports = requestHandler;

module.exports = {

    handler: requestHandler,
    text: 'sup'
};

// module.exports.handler = requestHandler;
// exports.handler = requestHandler;