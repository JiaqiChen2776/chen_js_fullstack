const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const server = http.createServer((req, res) => {
    // console.log(res);
    // 浏览器能支持自动解压 ungzip?
    // req.headers 数组， accept-encoding 包含了压缩信息
    res.end(req.headers['accept-encoding']);   // 不添加 res.end() 则会一直加载，直到超时
    if (req.headers['accept-encoding'].indexOf('gzip') != -1) {  // 支持 ungzip
        gzip = zlib.createGzip();
        res.writeHead(200, {
            'Content-Encoding': 'gzip',
            'Content-Type': 'text/plain;charset=utf-8'
        })
        fs.createReadStream('./a.txt').pipe(gzip).pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/plain;charset=utf-8'
        })
        fs.createReadStream('./a.txt').pipe(res);        
    }
    // res.end(req.headers['accept-encoding']);
    console.log('那个家伙来了');
});

server.listen(1314);