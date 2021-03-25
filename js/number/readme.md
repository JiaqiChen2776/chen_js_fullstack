### 特殊数字
- NaN
- +0、-0
- Infinity

1. NaN（not a number），表示不是一个数字，用于指出数字类型中的错误情况。它是一个特殊值，它与自身不相等，是唯一一个非自反的值（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN为 true。
对自反性的理解：自反就是自己等于自己（或者等于另一个自己）。
- 类型：`typeof NaN`结果为“number”
- 判断
 isNaN()、Number.isNaN()都可判断是否是数字，区别：
isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为准确。
```js
isNaN('NaN')    // true
Number.isNaN('NaN')     // false
```

2. Infinity（无穷）
- 范围

| -infinity | 正常显示 | -0 | 0 | 正常显示 | infinity |
| --- | --- | --- | --- | --- | --- |
| num<=1.7976931348623157e+308 | -1.7976931348623157e+308<num<-5e-324 |  -5e-324<num<0 | 0<=num<=5e-423 | 5e-423<num<1.7976931348623157e+308 | num>=1.7976931348623157e+308 |
```js
Number.MIN_VALUE    // 5e-324
Number.MAX_VALUE    // 1.7976931348623157e+308
```
`Number.MIN_VALUE`：js中最接近0的正值，小于它的值会被转为0
`Number.MAX_VALUE`：js中最大的正值
`Number.MAX_VALUE`与`Infinity`：如下
![c2e38a0920d1655a6f31ffea49c647d8.png](en-resource://database/1240:1)

---
![34de6b1b22ee1acc31df8bee97bdf553.png](en-resource://database/1242:1)


- 判断
isFinite()函数，有穷数返回true，无穷返回false。

- 运算
有穷可变无穷，无穷不可变有穷，后者运算都返回NaN。
```js
var a = 1/0;    // Infinity
var b = -1/0;   // -Infinity
a - 1    // Infinity
a + 1   // Infinity
a * 5   // Infinity
a / 5    // Infinity
a % 2   // NaN
2 % a   // 2

a -  a   // NaN
a + a   // Infinity
a * a   // Infinity
a / a    // NaN
a % a   // NaN
```

3. 0、+0、-0
- 0即+0
- -0转化为字符串时，结果为'0
```js
var a = -0
a.toString()    // 0
a + ''      // 0
String(a)   // 0
JSON.stringify(a)   // 0
```
- '-0'转化为数字时，结果为-0
```js
var a = '-0'
Number(a)   // -0
+a  // -0
JSON.parse(a)   //  -0
```
- 比较：相等无大小
```js
0 == -0     // true
0 === -0    // true
0 > -0  // false
```
- 区分+0与-0
```js
function isNegZero(n){
    n = Number( n )
    return (n === 0) && (1 / n === -Infinity)
}
isNegZero( -0 );//true
isNegZero( 0 );//false
```

---
**判断两值绝对相等**
我们知道`NaN !== NaN`，但是`0 === -0`，那如何判断两个值是否绝对相等呢？
- es6新增方法`Object.is()`
```js
Object.is(NaN, NaN) // true
Object.is(0, 0)     // true
Object.is(-0, 0)    // false
Object.is('0', 0)   // false
```
- es5判断
```js
function objectIs(v1, v2) {
  if (v1 !== v1) {
    // 针对 NaN
    return v2 !== v2
  } else if (v1 === 0 && v2 === 0) {
    // 针对 +0 -0
    return 1/v1 === 1/v2
  } else {
    // 其它
    return v1 === v2
  }
}
console.log(objectIs(NaN, NaN)) // true
console.log(objectIs(0, 0))         // true
console.log(objectIs(0, -0))        // false
console.log(objectIs('0', 0))       // false
```