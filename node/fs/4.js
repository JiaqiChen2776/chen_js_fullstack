const fs = require('fs');
const readStream = fs.createReadStream('./a.txt','utf-8');

readStream
    .on('data', (chunk) => {
        // chunk 表示数据的一部分
        console.log('读取到数据---------------\n' + chunk);
    })
    .on('error', (err) => {
        console.log('出错了'+ err.massage);
    })
    .on('end', () => {
        console.log('没有数据了');
    })
    .on('close', () => {
        console.log('已经关闭了');
    })