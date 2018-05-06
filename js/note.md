# js基础学习之函数

## 函数对象

- JavaScript 中的函数就是对象。对象是“名/值”对的集合并拥有一个连到原型对象的隐藏链接。

> 对象字面量产生的对象连接到`Object.prototype` 。<br/>函数对象连接到`Function.prototype`（该原型对象本身链接到`Object.prototype`）。
- 每个函数创建时都会自带两个隐藏属性：函数上下文和实现函数行为的代码（“调用”属性）。还随配一个`prototype`属性，其值为一个拥有`constructor`属性且值即为该函数的对象。
- 函数可以保存在变量、对象和数组中，也可被当做参数传递给其他函数，函数也可以再返回函数。而且，函数可拥有方法，也可被调用。

 --- 

## 函数字面量

- 通过函数字面量创建的函数对象：
```ruby
var add = function(a, b){
    return a + b;
};
```
- 函数字面量组成：
    - 保留字`function`
    - 函数名。可被省略，可用于递归调用自己，还可用于识别函数；若无函数名，则为匿名函数。
    - 参数。多个参数间用逗号分隔；函数被调用时被初始化为传递过来的实参的值。
    - 函数主体。函数被调用时执行。
    
    函数可嵌套。一个内部函数除了可以访问自己的参数和变量，它也能自由访问父函数的参数与变量。通过函数字面量常见的函数对象包含一个连到外部上下文的连接。这被称为闭包(closure)。

## 调用

调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形参，还接收两个附加的参数：`this`和`arguments`。<br/>

实参数与形参数不一致时，不会运行错误。若实参数过多，多余参数会被忽略；若实参数过少，缺失的值会被替换为`undefined`。

### 方法调用模式

当一个函数是对象的一个属性时，此函数即为方法。通过`this.`或`this[]`来调用此方法。可通过`this`访问的方法称为公共方法。

### 函数调用模式

当一个函数并非对象的属性时，则它就是被当做函数来调用的。这种模式下，`this`表示全局变量。如内部函数要访问`this`，可定义一个变量，并把`this`赋值给这个变量。
```rub
myObject.double = function(){
    var that= this;

    var helper = function(){
        that.value = add(that.value,that.value);
    };

    helper();   //以函数的形式调用helper
}
//以方法形式调用double
myObject.double();
document.writeln(myObject.value);
```

### 构造器调用模式

- 使用new关键字来调用，创建出来的对象会传递给this。另外，构造器函数命名须是大写格式。

```rub
//创建构造器函数
var Quo = function(string){
    this.status = string;
};
//公共方法
Quo.prototype.get_status = function(){
    return this.status;
};
//构造Quo实例
var myQuo = new Quo("confused");
```

### Apply 调用模式

apply方法接收两个参数：要绑定给this的值和一个参数数组。
```
//构造一数组
var array = [3,4];
var sum = add.apply(null,array);

//构造一个包含status成员的对象
var statusObject ={
    status:'A-OK';
};

//在statusObejct上调用get_status方法
var status = Quo.prototype.get_status.apply(statusObject);
```

注：函数被调用时，会得到一个`arguments`数组参数，通过此参数可访问所有被传递的参数列表，但`arguments`并不是真正的数组，它具有length属性，但没有任何数组方法。<br/>
一个函数总是会返回一个值，如无指定，则返回`undefined`。如使用`new`调用，则返回`this`。

## 递归

递归函数就是会直接或间接地调用自身的一种函数。<br/>
[经典案例——汉诺塔](https://baike.baidu.com/item/%E6%B1%89%E8%AF%BA%E5%A1%94/3468295#4_12)

注：尾递归是一种优化递归的方式，但JavaScript当前没有提供。

## 作用域

作用域控制着变量与参数的可见性及生命周期，它减少了名称冲突，并提供了自动内存管理。<br/>

JavaScript不支持块级作用域，但有函数作用域。定义在函数中的参数和变量在函数外部是不可见的，而在函数内部任何位置定义的变量，在该函数内部任何地方都可见。但因其不支持块级作用域，所以最好在函数体顶部声明所有该函数可能用到的变量。

## 闭包

闭包：一个函数可访问它被创建时所处的上下文环境。

通过调用函数的形式初始化`myObject`，将调用函数后的返回结果赋值给它。函数中的`value`变量对`increment`和`getValue`方法可用，但对其他程序不可用。
```
var myObject = (function(){
    var value = 0;

    return {
        increment: function(inc){
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function(){
            return value;
        }
    };
}());
```

通过构造器产生一个带有`status`属性和`get_status`方法的对象。

```
//创建一个名为quo的构造函数
//它构造出带有get_status方法和status私有属性的一个对象。
var quo = function(status){
    return {
        get_status:function(){
            return status;
        }
    };
};

//构造一个quo实例
var myQuo = quo("amazed");
document.writeln(myQuo.get_status());
```

## 回调

回调函数是一个作为参数传递给另外一个函数的函数，它在主体函数执行过程中的特定条件下执行。

```
request = prepare_the_request();
send_request_asynchronously(request,function(response){
    display(response);
});
```
一旦接收到响应（条件），作为参数的函数就会被调用。

## 模块
模块是一个提供接口却隐藏状态与实现的函数或对象。可使用函数和闭包来构造模块。
```
function CoolModule() {
    var something = "cool";
    var another = [1,2,3];

    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join(","));
    }

    return {
        doSomething:doSomething,
        doAnother:doAnother
    };
}

var foo = new CoolModule();

foo.doSomething();
foo.doAnother();
```

上述代码中，通过调用`CoolModule`函数来创建一个模块实例。`CoolModule`返回一个用对象字面量语法来表示的对象，这个对象中含有对内部函数而不是内部数据变量的引用。可将此对象类型的返回值看作模块的公共API，其最终被赋值给外部变量`foo`，然后就可以通过此返回值来访问API中的属性方法，如`doSomething()`。

### 模块模式的两个必要条件：

1. 必须有外部的封闭函数，且至少被调用一次；
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或修改私有的状态。