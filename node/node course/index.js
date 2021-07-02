const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// // working with files synchronous
// const textIn = fs.readFileSync(path.join(__dirname, '../txt', 'input.txt'), 'utf-8');
// const textOut = 'this is what we know about the avocado: ${textIn}';
//
// fs.writeFileSync('../txt/new.txt', textOut);
//
// // working with files asynchronous
// const textIn1 = fs.readFile(path.join(__dirname, '../txt', 'input.txt'), 'utf-8', (err, data) => {
//     if(err != null) {
//         console.log('an error occur while trying to read the file input.txt');
//     } else {
//         console.log(data);
//     }
// });
// const textOut1 = 'this is what we know about the avocado: ${textIn}';
//
// fs.writeFile('../txt/new1.txt', textOut1, (err) => {
//     if (err) {
//         console.log(err);
//     }
// })

///// working with http module /////

//server
const server = http.createServer((req, res) => {
    const pathName= req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.end('this is the overview');
    } else if (pathName === '/product') {
        res.end('this isb product')
    } else {
        res.writeHead(404, {
            'Content-type' : 'text/html',
            'my-own-header' : 'hello'
        });
        res.end('page not found');
    }
});

server.listen(8800, '127.0.0.1', () => {
    console.log('Listening to requests on port 8800');
});