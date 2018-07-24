// 扩展 Function ,bind 实现

// Function.prototype.bind2 = function (context,...args) {
//     var that = this;
//     var args = Array.prototype.slice.call(arguments, 1);
//     console.log("args", args);
//     // 闭包
//     return function () {
//         // console.log(context);   // { value: 1 }
//         // 1、bar 是谁？
//         // 2、.apply(context)
//         // console.log(that);  // [Function: bar]
//         const bindArgs = Array.prototype.slice.call(arguments);
//         console.log('bindArgs', bindArgs);
//         that.apply(this instanceof that? this: context, args.concat(bindArgs));
//     }
// }

// 升级版（支持 new）
Function.prototype.bind2 = function(context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var FNOP = function() {}
    var bound = function() {
        var bindArgs = Array.prototype.slice.call(arguments);
        // this instanceof self  为 new 的情况
        self.apply(this instanceof self ? this: context, args.concat(bindArgs));
    }   
    FNOP.prototype = this.prototype;
    bound.prototype = new FNOP();
    return bound;
}

var value = 2;
var foo = {
    value: 1
}
function bar (name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name, age);
}
bar.prototype.friend = 'kevin';
var bindFoo = bar.bind2(foo, 'daisy');
var obj = new bindFoo('18');
console.log(obj.habit);
console.log(obj.friend);
// bindFoo();

// var foo = {
//     value: 1
// }
// function bar(name, age) {
//     console.log(this.value);
//     console.log(name, age);
// }
// const bar2 = bar.bind2(foo, "cjq");
// bar2(18);

// 分析：
// bind ?
// 1. 返回一个新的函数，高阶函数 return function( bar() ) {}
// 2. this 的指向 ? 闭包

