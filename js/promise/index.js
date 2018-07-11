// const p1 = new Promise((resolve,reject) => {
//     setTimeout(() => {
//         resolve('Hello world')
//     }, 2000);
// });
// p1.then((data)=> {
//     console.log(data);
// })

// 引入promise
const Promise = require('./promise.js');
// 将要执行的耗时任务封装在 excutor() 里面，实例化时就开始执行了
// resolve ? 
// reject ? excutor()执行中出现错误
// 两者目前是 形参，类型是函数
const p = new Promise((resolve,reject)=> {
    // setTimeout(() => {
    //     resolve('Hello');   //实例化时不执行，只是作为实参传递 
    //     // reject('error');
    //     // console.log('aaa');
    // },1000);
    setTimeout(resolve,1000,'Hello');
})
setTimeout(() => {
    p.then((data) => {
        console.log(data);
    },(err) => {
        console.log(err);
    });
}, 2000);

