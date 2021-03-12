### this指向问题
1. 如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。　
2. 如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，js的严格版中this指向undefined。
3. 如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象。

注： 通常，this永远指向的是最后调用它的对象。

---

1. 函数调用
```js
function fn() {
  this.name = 'fn'
  console.log(this) // window
}
fn()
```
谁调用，this就指向谁。对应第1条。

2. 方法调用
```js
var obj = {
  name: 'chen',
  fn: function() {
    console.log(this)
  }
}
obj.fn()  // obj
globalThis.obj.fn()   // obj
const func = globalThis.obj.fn
func()  // window
```
第一个，对应第1条；
第二个，对应第3条；
第三个，func是全局变量，在全局环境下执行，this指向window。对应第2条。


3. 构造函数调用
```js
function Fn() {
  console.log(this)
}
var a = new Fn()    // Fn {}
```
用new关键字调用函数，会创建一个连接到该函数的prototype成员的新对象，并返回该对象，this指向返回的对象。此函数变为该对象的构造函数。

```js
function Fn() {
  console.log(this)
  return {}
}
var a = new Fn()    // {}
```
如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。
函数也是对象，this指向返回的函数；null虽然类型是对象，但this还是指向函数的实例。


4. bind、call、apply 调用
bind、call、 apply 都可以改变this的指向，第一个参数就是this要指向的对象。
bind不会立即执行函数，只是绑定this
call、apply则会立即执行，可传参数，call方法将参数接连放在call的第一个参数后，而apply是传一个数组。
通过bind绑定过this的函数，后续用call、apply都无法改变其this指向了。


