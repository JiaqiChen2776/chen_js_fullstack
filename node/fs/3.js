const fs = require('fs');
const zlib = require('zlib');  //文件压缩

const gzip = zlib.createGzip();   // 创建一个压缩的上下文环境
// readFile 读取文件，createReadStream 一边读，一边写入另一个文件
const inFile = fs.createReadStream('./a.txt');   // 可读流
const outFile = fs.createWriteStream('./a.txt.gz');   // gz 后缀名， 可写流
inFile.pipe(gzip).pipe(outFile);

