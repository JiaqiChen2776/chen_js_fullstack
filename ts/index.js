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
function func(val) {
    if (val.length) {
        return val.length;
    }
    else {
        return val.toString().length;
    }
}
console.log(arr1, arr2, color, colorName, a, b, c, func(123), func('123'));
