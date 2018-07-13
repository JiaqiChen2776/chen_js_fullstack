const fs = require('fs');
let data;

// 异步是通过回调解决的
// readFileSync 自动将执行中断，将读取文件操作同步化
// 读取失败情况？ try{} catch(){}
try {
    data = fs.readFileSync('./f2.txt','utf8');
    console.log('文件读取完成');
    console.log('文件内容：' + data);
}catch(err) {
    console.log('文件读取错误');
    console.error('错误信息：' + err.message);
}



