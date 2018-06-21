var obj1 = {
    name: 'sven'
}
var obj2 = {
    name: 'anne'
}

window.name = 'window';

var getName = function() {
    // 函数内部一定会有个this
    // 函数的this由运行时决定，并由运行时的函数调用方式来决定
    console.log(`Hi,I am ${this.name}`);
}

// 普通函数
getName();  //结果为 window,在严格模式下为 undefined

// 当 obj1 obj2 想要调用 getName() 却不想拥有它时，可使用 call() 或 apply()
// getName() 中的 this 可动态改变
getName.call(obj1);
getName.apply(obj1);


// call() 与 apply() 的区别
var func = function(a, b, c) {
    console.log([a, b, c]);
}
func.apply(null, [1,2,3]);  //将参数一次性传递
func.call(null, 1,2,3);  //分别传递