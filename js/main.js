// NODE SERVER
var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
    // Reading the html file
    fs.readFile('../index.html', function (err, data) {
        if(err)
        {
            console.log("Not working correctly...");
        }
        // Write header
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.write(data);
        response.end();
    });
}).listen(8080);

console.log("Server running at http://192.168.33.10:8080/");

console.log("Welcome to nodejs");