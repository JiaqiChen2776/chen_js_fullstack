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

let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [4, 5, 6]
enum Color{ red = 1, green = 2, blue = 3 }
let color: Color = Color.green

console.log(arr1, arr2, color)