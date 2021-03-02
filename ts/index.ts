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
// abstract class Developer {
//   abstract skill(): any
// }
// class WebDeveloper extends Developer {
//   skill() {
//     return ['js', 'html', 'css', 'vue']
//   }
// }
// class DatabaseDeveloper extends Developer {
//   skill() {
//     return ['mysql', 'redis', 'linux']
//   }
// }

// let chen = new WebDeveloper()
// let wu = new DatabaseDeveloper()
// console.log(chen.skill())
// console.log(wu.skill())
// -----------------------------------------------


// 泛型
// function createArr<T>(length: number, value: T): Array<T> {
//   let result: T[] = [];
//     for (let i = 0; i < length; i++) {
//         result[i] = value;
//     }
//     return result;
// }
// console.log(createArr(3, 'x'))
// console.log(createArr<number>(3, 1))


// function person<N, A>(name: N, age: A): [A, N] {
//   return [age, name]
// }
// console.log(person('chen', 18))


// interface SearchFunc {
//   (source: string, subString: string): boolean;
// }

// let mySearch: SearchFunc = function(source: string, subString: string) {
//     return source.search(subString) !== -1;
// }

// console.log(mySearch('abcd', 'bc'))



// class GenericNumber<T> {
//   zeroValue: T;
//   add: (x: T, y: T) => T;
// }

// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function(x, y) { return x + y; };


// 泛型接口
// interface CreateArray<T = string> {
//   (length: number, value: T): Array<T>;
// }

// let create: CreateArray;
// create = function<T>(length: number, value: T): Array<T> {
//   let result: any[] = [];
//     for (let i = 0; i < length; i++) {
//         result[i] = value;
//     }
//     return result;
// }

// console.log(create(3, 'x'))
// -----------------------------------------------


// class AddFunc<T> {
//   init: T;
//   add: (x: T, y: T) => T
// }
// let myAddFunc = new AddFunc<number>()
// myAddFunc.init = 1
// myAddFunc.add = function(x, y) {
//   return this.init + x + y
// }
// console.log(myAddFunc.add(2, 3))
// -----------------------------------------------


// 泛型约束
// class Test {
//   init= 1;
// }
// function create<T>(c: {new(): T}): T {
//   return new c()
// }
// let testVal = create(Test)
// console.log(testVal)
// -----------------------------------------------


// keyof
// interface Person {
//   name: string;
//   age: number;
//   location: string; }
//  type K1 = keyof Person; // "name" | "age" | "location"
//  type K2 = keyof Person[]; // number | "length" | "push" | "concat" | ...
//  type K3 = keyof { [x: string]: Person }; // string | number


// function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
//   return obj[key];
// }
// let x = {a: 1, b: 2, c: 3}
// getProperty(x, 'a')
// -----------------------------------------------


// 泛型条件类型
// interface Dictionary<T = any> {
//   [key: string]: T
// }

// type StrDict = Dictionary<number>
// type DictNumber<T> = T extends Dictionary<infer V> ? V : never
// type StrDictNumber = DictNumber<StrDict>

// async function stringPromise() {
//   return "Hello, Semlinker!"; 
// }
// interface Person {
//   name: string;
//   age: number; 
// }
// async function personPromise() {
//   return { name: "Semlinker", age: 30 } as Person; 
// }

// type PromiseType<T> = (args: any[]) => Promise<T>;
// type UnPromisify<T> = T extends PromiseType<infer U> ? U : never;
// type extractStringPromise = UnPromisify<typeof stringPromise>; // string
// type extractPersonPromise = UnPromisify<typeof personPromise>; // Person

// console.log(typeof stringPromise, typeof personPromise)
// -----------------------------------------------


// in
// type Keys = "a" | "b" | "c"
// type Obj = {
//   [p in Keys]: any
// }
// -----------------------------------------------

// infer
// function TestFunc() {
//   return 123
// }
// type Ha = typeof TestFunc
// type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// type Test = GetReturnType<typeof TestFunc>
// -----------------------------------------------


// Partial
// interface Person {
//   name: string;
//   age: number;
// }

// type TestPerson = Partial<Person>

// const yourInfo: Person = {
//   name: 'wu',
//   age: 18
// }
// const myInfo: TestPerson = {}
// -----------------------------------------------


// Record
// type Page = "home" | "about" | "contact"
// interface NewPage {
//   title: string;
//   name: string;
//   desc: string;
// }
// const x: Record<Page, NewPage> = {
//   home: { title: 'home', name: 'home', desc: 'home' },
//   about: { title: 'about', name: 'about', desc: 'about' },
//   contact: { title: 'contact', name: 'contact', desc: 'contact' }
// }
// -----------------------------------------------

// Pick
// type PageDesc = Pick<NewPage, "title" | "name">
// -----------------------------------------------

// Exclude
// type Test1 = Exclude<"a" | "b" | "c", "d">   // "a" | "b" | "c"
// type Test2 = Exclude<"a" | "b" | "c", "a">   // "b" | "c"
// type Test3 = Exclude<"a" | "b" | "c", "a" | "b"> // "c"
// -----------------------------------------------

// ReturnType
// type T0 = ReturnType<() => string>; // string
// type T1 = ReturnType<(s: string) => void>; // void
// type T2 = ReturnType<<T>() => T>; // unknown
// type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
// type T4 = ReturnType<any>; // any
// type T5 = ReturnType<never>; // never
// // type T6 = ReturnType<string>; // Error
// // type T7 = ReturnType<Function>; // Error

// function neverFunc():never {
//   while(true) {}
// }
// let test5: T5 = neverFunc()
// -----------------------------------------------


