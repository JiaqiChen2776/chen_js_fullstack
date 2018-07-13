
// es6 的模块化方案：import export   module
// sea.js 淘宝的模块化方案
// COMMONJS require NODE 内置支持的js模块方案
const fs = require('fs');
let data;

var p = new Promise ((resolve,reject) => {
    fs.readFile('./f2.txt', 'utf8', (err, data) => {
        // 读取文件，异步操作，使用 callback
        // 异步：这里有io操作，文件在硬盘，运行在内存，要去硬盘读取
        // console.log('真正的读取完成了');
        if (err) {
            console.log('错误信息' + err);
            reject('文件读取失败');
        } else {
            console.log('文件的内容：' + data);
            resolve('读取完成，做其他事情');
        }
    });
})
p.then((data)=>{
    console.log(data);
}).catch(e => {
    console.log(e);
})


