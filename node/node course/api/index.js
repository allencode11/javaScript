const fs = require('fs');
const http = require('http');

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

    return output;
}
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName= req.url;

    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-type' : 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        res.end(tempOverview);
    } else if (pathName === '/product') {
        res.writeHead(200, {'Content-type' : 'text/html'});
        res.end(tempProduct)
    } else if (pathName === '/api') {
        res.writeHead(200, {'Content-type' : 'application/json'});
        res.end(data)
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