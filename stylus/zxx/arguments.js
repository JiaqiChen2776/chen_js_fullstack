// 参数不限（相加）

// 方法一
// function sum(...args) {
//     console.log(args);
//     let total = 0;
//     args.forEach(i => {
//         total += i;
//     })
//     return total;
// }

// 方法二
// function sum() {
//     // this 自动生成，函数执行的方式决定
//     // arguments 所有的参数
//     let total = 0;
//     console.log(arguments.length);
//     // arguments是个类数组，js 生成的怪胎，拥有length属性
//     // Array.prototype.forEach  数组才可调用 forEach() 方法
//     for(let i=0;i<arguments.length;i++){
//         total += arguments[i];
//     }
//     return total;
// }

// 方法三
function sum() {
    // this 自动生成，函数执行的方式决定
    // arguments 所有的参数
    let total = 0;
    // Array.from() 可将一个类数组变成一个真正的数组
    Array.from(arguments).forEach(i => {
        total += i;
    })
    return total; 
}


console.log(sum(1,2,3,4,5,6,7,8,9,10));