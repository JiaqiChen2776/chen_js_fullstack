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
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [4, 5, 6]
enum Color{ red = 1, green, blue }
let color: Color = Color.green
let colorName: string = Color[2]

let a: any = 4
a = a.toFixed(2)
a = 'b'

let b: undefined = undefined
let c: null = null

// 类型断言
function func(val: string | number): number {
  if ((val as string).length) {
    return (val as string).length
  } else {
    return val.toString().length
  }
}
// 定义联合类型
type Combinable = string | number
function func3(val: Combinable): number {
  if ((val as string).length) {
    return (val as string).length
  } else {
    return val.toString().length
  }
}
console.log(func('123'), func3('123'))

// void
function func2() {
  console.log('void')
  return null
}
let d: void = func2()

// 函数
function getInfo(name: string, age?: number, hometown: string = '北京'): string {
  let ageStr: string = age ? `I'm ${age} years old, ` : ''
  return `I am ${name}, ${ageStr}I come from ${hometown}`
}
let introduce: string = getInfo('张三')

// 剩余参数
function getSum(num1: number, num2: number, ...arr: number[]): number {
  let sum: number = num1 + num2
  arr.forEach(i => sum += i )
  return sum
}
let sum = getSum(1, 2, 3, 4, 5)

// 重载
// function add(a: Combinable, b: Combinable) {
//   if (typeof a === 'string' || typeof b === 'string') {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add(12, '3')
console.log(result, result.split(' '))



