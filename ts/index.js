// function greeter(str: object) {
//   console.log(str, ', Hello World!')
// }
// let arr = '[1, 2]'
// greeter(arr)
// interface Person {
//   name: string,
//   age: number
// }
// function greeter(person: Person) {
//   return `I am ${person.name}, I'm ${person.age} years old.`
// }
// let user = { name: '张三', age: 18 }
// console.log(greeter(user))
// class Student {
//   description: string;
//   constructor(public name, public age) {
//       this.description = `I am ${name}, I'm ${age} years old.`
//   }
// }
// interface Person {
//   name: string;
//   age: number;
// }
// function greeter(person: Person) {
//   return person.description
// }
// let user = new Student("张三", 18)
// console.log(user)
// console.log(greeter(user))
// 基本类型
var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 3] = "blue";
})(Color || (Color = {}));
var color = Color.green;
var colorName = Color[2];
var a = 4;
a = a.toFixed(2);
a = 'b';
var b = undefined;
var c = null;
// 类型断言
function func(val) {
    if (val.length) {
        return val.length;
    }
    else {
        return val.toString().length;
    }
}
function func3(val) {
    if (val.length) {
        return val.length;
    }
    else {
        return val.toString().length;
    }
}
console.log(func('123'), func3('123'));
// void
function func2() {
    console.log('void');
    return null;
}
var d = func2();
// 函数
function getInfo(name, age, hometown) {
    if (hometown === void 0) { hometown = '北京'; }
    var ageStr = age ? "I'm " + age + " years old, " : '';
    return "I am " + name + ", " + ageStr + "I come from " + hometown;
}
var introduce = getInfo('张三');
// 剩余参数
function getSum(num1, num2) {
    var arr = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        arr[_i - 2] = arguments[_i];
    }
    var sum = num1 + num2;
    arr.forEach(function (i) { return sum += i; });
    return sum;
}
var sum = getSum(1, 2, 3, 4, 5);
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
var result = add(12, '3');
console.log(result, result.split(' '));
function func4(obj) {
    var _a;
    var num = (_a = obj === null || obj === void 0 ? void 0 : obj.x) !== null && _a !== void 0 ? _a : 0;
    return num;
}
var func4_r1 = func4();
var func4_r2 = func4({ x: 1 });
console.log(func4_r1, func4_r2);
