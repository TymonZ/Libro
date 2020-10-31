const { botSetup } = require("./lib/botSetup");

const http = require('http');

const fs = require('fs');

const port = 3000;

// Run discord.js bot
// botSetup();

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./src/web/index.html', (error, data) => {
        if(error) {
            res.writeHead(404);
            res.write('Error: File Not Found');
        } else {
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, (error) => {
    if(error) {
        console.error(error);
    } else {
        console.log('SERVER IS LISTENING ON PORT', port);
    }
})