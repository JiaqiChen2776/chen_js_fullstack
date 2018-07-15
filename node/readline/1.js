const readline = require('readline');

// readline 在哪里？
const rl = readline.createInterface({
    // process 进程：生成一个nodejs的主进程，不断读取用户的输入（无需引入）
    // stdin 输入，stuout 输出
    input: process.stdin,
    output: process.stdout
});

rl.question('please input a word:', function(answer) {
    // 回调函数根据输入作出响应
    console.log('Your has entered [%s]', answer.toUpperCase());
    rl.close();
});
