### 函数柯里化
柯里化（Currying）：就是把接收多个参数的函数变成接收单一参数（第一个参数）的函数，并返回一个函数去处理剩下的参数。

实现“执行 add(1)(2)(3) 结果为6”
- 普通版
```js
function add(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}
```
- 简洁版
```js
const add = a => b => c => a + b + c
```
- 兼容版
```js
function add() {
  // 第一次执行时，定义一个数组专门用来存储所有的参数
  var _args = Array.prototype.slice.call(arguments);
  // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
  var _adder = function() {
    // console.log(_args)
      _args.push(...arguments);
      return _adder;
  };
  // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
  _adder.toString = function () {
      return _args.reduce(function (a, b) {
          return a + b;
      });
  }
  return _adder;
}

add(1)(2)(3)    // 6
add(1, 2)(3)    // 6
add(1)(2, 3)    // 6
```

参考：
    1. [详解JS函数柯里化](https://www.jianshu.com/p/2975c25e4d71)