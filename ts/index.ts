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
// -----------------------------------------------

// 基本类型
// let arr1: number[] = [1, 2, 3]
// let arr2: Array<number> = [4, 5, 6]
// enum Color{ red = 1, green, blue }
// let color: Color = Color.green
// let colorName: string = Color[2]

// let a: any = 4
// a = a.toFixed(2)
// a = 'b'

// let b: undefined = undefined
// let c: null = null
// -----------------------------------------------

// 类型断言
// function func(val: string | number): number {
//   if ((val as string).length) {
//     return (val as string).length
//   } else {
//     return val.toString().length
//   }
// }
// -----------------------------------------------
// 定义联合类型
// type Combinable = string | number
// function func3(val: Combinable): number {
//   if ((val as string).length) {
//     return (val as string).length
//   } else {
//     return val.toString().length
//   }
// }
// console.log(func('123'), func3('123'))
// -----------------------------------------------

// void
// function func2() {
//   console.log('void')
//   return null
// }
// let d: void = func2()
// -----------------------------------------------

// 函数
// function getInfo(name: string, age?: number, hometown: string = '北京'): string {
//   let ageStr: string = age ? `I'm ${age} years old, ` : ''
//   return `I am ${name}, ${ageStr}I come from ${hometown}`
// }
// let introduce: string = getInfo('张三')
// -----------------------------------------------

// 剩余参数
// function getSum(num1: number, num2: number, ...arr: number[]): number {
//   let sum: number = num1 + num2
//   arr.forEach(i => sum += i )
//   return sum
// }
// let sum = getSum(1, 2, 3, 4, 5)
// -----------------------------------------------

// 重载
// function add(a: Combinable, b: Combinable) {
//   if (typeof a === 'string' || typeof b === 'string') {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }
// function add(a: number, b: number): number;
// function add(a: string, b: string): string;
// function add(a: string, b: number): string;
// function add(a: number, b: string): string;
// function add(a: Combinable, b: Combinable) {
//   if (typeof a === 'string' || typeof b === 'string') {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }
// const result = add(12, '3')
// console.log(result, result.split(' '))
// -----------------------------------------------

// 接口与重载
// interface BasketballPlayer {
//   (name: 'YaoMing', age: number): void;
//   (name: 'Kobe', age?: number): void;
//   (name: 'James', age?: number): void;
// }
// let playBasketball: BasketballPlayer = function (name, age) {
//   if (name === 'YaoMing' && age && age >= 25) {
//     console.log('good Center')
//   } else if (name === 'Kobe') {
//       console.log('good guard')
//   } else if (name === 'Jams') {
//       console.log('good forward')
//   } else {
//       console.log('ordinary baskerball player')
//   }
// }

// playBasketball('Kobe', 20)
// -----------------------------------------------

// interface addVal {
//   (a: number, b: number): number;
//   (a: string, b: string): string;
//   (a: string, b: number): string;
//   (a: number, b: string): string;
// }
// let addFunc: addVal = function (a, b) {
//   if (typeof a === 'string' || typeof b === 'string') {
//     return a.toString() + b.toString();
//   }
//   return a + b;
// }
// const res = addFunc('1', 2)
// res.split(' ')
// -----------------------------------------------

// function add({ one, two}) {
//   return one + two
// }
// const total = add({ one: 1, two: 2 })
// console.log(total)
// -----------------------------------------------

// let arr: [string, number, boolean]
// arr = ['a', 1, true]
// arr.push('b')
// console.log(arr, arr.length)
// -----------------------------------------------

// 接口实现
// interface Girl {
//   name: string;
//   age: number;
//   waistline?: number;
//   say(): string;
// }

// class XiaoJieJie implements Girl {
//   name: string;
//   age: number;
//   say() {
//     return "欢迎光临";
//   }

//   constructor(name: string, age: number) {
//     this.name = name
//     this.age = age
//   }
// }

// let girl1 = new XiaoJieJie('chen', 18)
// console.log(girl1)
// -----------------------------------------------


// 类的继承
// class Lady {
//   protected content = 'Hello!'
//   sayHello() {
//     return this.content
//   }
// }

// class Girl extends Lady {
//   sayLove() {
//     return 'I love you'
//   }
//   // 类方法的重写
//   sayHello() {
//     console.log('1', this.content)
//     return super.sayHello() + ', my darling!'
//   }
// }

// class Test extends Girl {
//   sayHello() {
//     console.log('2', this.content)
//     return super.sayHello()
//   }
// }

// let chen = new Test()
// // console.log(chen.content)
// console.log(chen.sayHello())
// -----------------------------------------------

// 私有变量的操作
// class Girl {
//   public readonly name: string
//   content = 'hahahha'
//   constructor (private _age: number, name: string) {
//     this.name = name
//   }
//   get age() {
//     return this._age
//   }
//   set age(age: number) {
//     this._age = age
//   }
//   static sayHello() {
//     return 'hi'
//   }
// }
// let chen = new Girl(18, 'chen')
// console.log('before: ', chen.age)
// chen.age = 16
// console.log('after: ', chen.age)
// console.log(chen.name)
// // chen.name = 'chenjiaqi'

// // static
// Girl.sayHello()
// -----------------------------------------------


// 抽象类
abstract class Developer {
  abstract skill(): any
}
class WebDeveloper extends Developer {
  skill() {
    return ['js', 'html', 'css', 'vue']
  }
}
class DatabaseDeveloper extends Developer {
  skill() {
    return ['mysql', 'redis', 'linux']
  }
}

let chen = new WebDeveloper()
let wu = new DatabaseDeveloper()
console.log(chen.skill())
console.log(wu.skill())

