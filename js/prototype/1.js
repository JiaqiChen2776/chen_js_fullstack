// 原型链 prototype

var obj = {a: 1};
//可枚举对象
// in 可在自身和原型链上查找属性/方法
console.log ("a" in obj);   //true
// 对象不止有自己的属性与方法，还有其继承得来的原型链上的属性与方法
console.log("toString" in obj); //true

// 判断原型链对象上是否有某属性，o对象，name属性名
// obj, a false
// obj, toString true
function hasPrototypeProperty(o, name) {
    // hasOwnProperty() 方法用于检查属性是否为自身属性
    return name in o && !o.hasOwnProperty(name)
}

console.log(hasPrototypeProperty(obj,"a"));   //false
console.log(hasPrototypeProperty(obj,"toString"));  //true

// 函数是对象 Object
// Person 可以是程序员，作曲家，作家的原型链对象
// prototype 属性  in obj , in Object
// prototype 入口？ js 所有属性其实是由 function 构造的
// 函数都有的属性


// 分解prototype
// 实例 instance p1 p2  都有自身属性name，由Person 构建函数 this.name = name;
// 也有创建时就有的prototype属性
// Person 类，constructor
// Person.prototype.sayName

// 例：const p1 = new Person('小明');
// 新的对象构建后，可得到原型Person上的所有东西  
//     new后，Person类将返回一个函数对象（这个对象已有Person原型链上的所有属性与方法）
// 两者不是类与对象的关系（父与子），是原型关系

// constructor 属性设置，车头
// constructor  -> prototype
// 方法，prototype 车身



function Person(name) {
    this.name = name;
}
// 函数
// js 几乎所有的函数都有一个prototype属性，
// 指针一样，指向一个对象,属性或方法的集合

// Person.prototype.getName = function() {
//     return this.name;
// }
Person.prototype = {
    getName: function() {
        return this.name;
    }
}

// js 原型式继承
// 一、 constructor Person  name +books 属性
//      prototype 方法链（自身方法），还需继承拥有 Person 的方法链（让子类拥有父类的所有属性）
function Author(name, books) {
    // 新的构造函数
    Person.call(this, name);
    this.books = books;
}
Author.prototype.getBooks = function() {
    return this.books;
}

// 得到 Person 的 prototype
extend(Author, Person);

// 构造函数 Author prototype  -->
// superClass prototype  --> superClass.prototype
function extend(subClass, superClass) {
    // 第三者（干净），利用第三者 F 
    var F = function() {};  //空的构造函数
    F.prototype = superClass.prototype;
    // p1, prototype  -> F.prototype
    subClass.prototype = new F();  //新的对象
    console.log(subClass.prototype.constructor);  //结果为[Function: Object]
    // subClass会短暂地失去构造函数，需重新指回
    subClass.prototype.constructor = subClass;
    console.log(subClass.prototype.constructor);   //结果为[Function: Author]
}


const author = new Author('雨果', ['悲惨世界']);
// author 函数的prototype 指向 Author 的prototype
// this 实例对象也是函数， this 指向，作用域可以找到属性
// 方法？ prototype 去查找 Author 对象的prototype
console.log(author.name);
console.log(author.books);

// 如何 用 author 调用 Person 的 getName() 方法
console.log(author.getName());
console.log(author.getBooks());