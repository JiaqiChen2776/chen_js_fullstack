const a = 1;
// 不支持es6的浏览器怎么办？ babel 一下  --> babel main.js
// 箭头函数也编译
const func = () => {
    console.log(a)
}