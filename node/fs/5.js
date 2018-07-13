const fs = require('fs');

fs.writeFile('./b.txt','hello world','utf-8', (err) => {
    // callback() 异步风格
    if (err) throw err;
    console.log('b文件写入成功');
})

fs.writeFileSync('c.txt','hello world','utf-8');  //首先执行
console.log('c文件写入成功');