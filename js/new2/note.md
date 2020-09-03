# 没有对象？new一个！

我们都知道，使用`new`后可返回一个对象，通常用于实例化一个“类”。
用法：
```ruby
function Student (name, age) {
    this.name = name;
    this.age = age;
}
Student.prototype.sayName = function() {
    console.log('I am '+ this.name);
}
const person =new Student('小明');
person.sayName();  // I am 小明
```
## 问题分析
首先我们分析一下，手动实现new有什么要求。</br>
1. 创建一个函数，可返回一个新的对象
2. 需要访问到`Student`构造函数里的属性
3. 需要访问到`Student.prototype`中的属性和方法

## 具体步骤分析

### 一、参数传递
若要实现上面代码的相同效果，首先明确需要一个“类”的参数，以及其它参数（如`name`）。</br>
js 的函数参数非常灵活，形参数量可不确定（使用`...args`），也可不给出。函数中有一个 与生俱来的`arguments`对象，具有`length`属性，但不是数组，所以不可使用数组方法。</br>

#### `arguments` 简单分析
下述代码中的输出语句结果即为所传实参的集合：</br>
{ '0': [Function: Student], '1': '小明', '2': 18 }
```ruby
function objectFactory() {
    console.log(arguments);
}
const person = objectFactory(Student, '小明',18);
```

### 二、方法实现

1. 得到 `Student` 类的构造函数</br>

由前面 `arguments` 简单分析可知，`arguments`中的第一个参数即为`Student`的构造函数。上面说到，arguments 并非数组，那我们如何得到第一项呢？</br>
两种方法：`[].shift.call(arguments)`  或  `Array.from(arguments)`
```
var Constructor = [].shift.call(arguments);
```

2. 创建一个新的对象

创建一个新的对象非常简单，如下：</br>
```
const obj = new Object();
```

3. 设置新对象的 `__proto__` 属性

`__proto__`是对象的私有属性，指向构造该对象的构造函数的原型。所以此步须将新的对象的此属性指向 `Constructor`的原型。
```
obj.__proto__ = Constructor.prototype;
```

4. 得到构造函数上的 this 属性

若要实例化一个“类”，则必须调用其构造函数，在执行构造函数时，其 `this`的值是动态的变化的，即为当前调用该函数的对象。

可是这里有个问题，若此时直接调用构造函数并传值
```
Constructor(arguments);
```
最终结果将为`undefined`。

这是为什么呢？

原因是构造函数中的 `this`并没有指向当前的新对象，此时`apply()`方法就可完美解决这个问题（`call()`方法也可），具体的`apply()`的使用及`apply()`与`call()`的异同可参照[大神文章](https://www.jianshu.com/p/00dc4ad9b83f)。

结果：
```
function objectFactory(){
    var Constructor = [].shift.call(arguments);
    var obj = new Object();
    obj.__proto__ = Constructor.prototype;
    Constructor.apply(obj, arguments);
    return obj;
}

const person = objectFactory(Student, '小明', 18);
person.sayName();   // I am 小明
```

## 结束

对于手动实现`new`的学习，原型的概念更清晰了，在具体的实现过程中也学习到了`shift`、`call`、`apply`等方法的一些使用。收获颇丰。