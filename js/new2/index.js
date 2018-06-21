function Otaku (name, age){
    this.name = name;
    this.age = age;
    this.habit = 'Games'; 
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function() {
    console.log('I am '+ this.name);
}

// new : 返回一个对象
// 不使用 new 关键字？
// 分析：
// 1. 要返回一个新的对象
// 2. 访问到 Otaku 构造函数里的属性
// 3. 访问到 Otaku.prototype 中的属性和方法

// const person = new Otaku('曾凯', 18);
// person.sayYourName();


// 形参：
// 参数1 obj 是类,但后几个参数...   name, age
// 函数的参数不需要被确定,使用 ...args 即可
// 形参可以都不写，使用 arguments 
// （js 的函数参数异常灵活，数量不定（甚至不给），还有 ... reset 运算符整合起来，都会跟 arguments 结合起来）
function objectFactory(){
    // console.log(arguments);  //{ '0': [Function: Otaku], '1': '鸠摩智', '2': 50 }
    // 获取 arguments 中的第一项，分解动作： 获取第一项，其余项都是参数
    // arguments 不具备数组的方法，需要借助数组--->  两种方法： [].shift.call(arguments)  或  Array.from(arguments)
    var Constructor = [].shift.call(arguments);
    // console.log(Constructor, arguments);
    var obj = new Object();
    obj.__proto__ = Constructor.prototype;
    // call() 与 apply() --> 区别： call() 传参必须每个都写出，apply()则不用
    // 在 apply 内部手动指定函数执行时的 this --> obj
    // Constructor(arguments);
    Constructor.apply(obj, arguments);
    return obj;
    // 1. 设置 obj 的 __proto__
    // 2. 得到构造函数上的 this 属性（要执行构造函数，传参数、要赋值、this 要指向当前对象）
    // console.log(obj);
    // var args = 
}

const person = objectFactory(Otaku, '鸠摩智', 50);
person.sayYourName();
