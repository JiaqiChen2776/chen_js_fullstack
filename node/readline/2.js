const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('access.log')
    // output: process.stdout
});

rl.on('line', (line) => {
    // console.log(`一条日志内容：${line}`);
    const arr = line.split(' ');
    console.log('访问时间： %s %s, 访问地址： %s', arr[0], arr[1], arr[13]);
});
