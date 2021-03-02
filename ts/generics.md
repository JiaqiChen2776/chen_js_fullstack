## 泛型及其应用
泛型（Generics）是指在定义函数、接口、类时不指定类型，而是在使用的时候指定类型。
泛型可在成员之间提供有意义的约束，这些成员可以是：类的实例成员、类的方法、函数参数和返回值。

示例：
```ts
function createArr<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
// 调用时可不指定类型，可自动推断出类型
console.log(createArr(3, 'x'))
console.log(createArr<number>(3, 1))
```
// 定义泛型T，在函数调用时指定类型，相比于any，泛型可保持多处类型一致。


### 可定义多个类型
```ts
function person<N, A>(name: N, age: A): [A, N] {
  return [age, name]
}
console.log(person('chen', 18))
```


### 介绍几个基础操作符
1. `typeof`
用来获取一个变量声明或对象的类型
```ts
const num: number = 1
typeof num  // number

function toArray(x: number): Array<number> {
 return [x];
}
typeof toArray  // (x: number) => number[]
```

2. `keyof`
`keyof`操作符可用于获取某种类型的所有键，返回类型是联合类型
```ts
interface Person {
  name: string;
  age: number;
}
type K1 = keyof Person; // "name" | "age"
```

3. `extends`
结合`extends`可用于检查对象上的键是否存在
```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
let x = {a: 1, b: 2, c: 3}
getProperty(x, 'a') // 1
getProperty(x, 'd') // error TS2345: Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"'.
```

4. `in`
`in`用来遍历枚举类型
```ts
type Keys = "a" | "b" | "c"
type Obj = {
  [p in Keys]: any
}
/*
{ 
  a: any;
  b: any;
  c: any;
}
*/
```

5. `infer`
`infer`用于声明一个类型变量并对其使用，实现类型抽取
```ts
function TestFunc() {
  return 123
}
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type Test = GetReturnType<typeof TestFunc>
```
如上，使用`GetReturnType`类型时，传了一个类型参数`typeof TestFunc`（即`() => number`）；`T extends (...args: any[]) => infer R ? R : any;`表示若传递过来的类型满足`(...args: any[]) => infer R`的约束，则将`R`类型（函数返回值的类型）返回，否则返回`any`类型。


### 泛型约束
使用泛型约束，参数不符时在编译阶段就会报错
```ts
function identity<T>(arg: T): T {
  return arg;
}
```
如上，如果在identity中要打印出arg.length，编译器将报错，因为arg类型未确定，是否有length属性也未确定

- 通过接口约束
```ts
interface Lengthwise {
  length: number
}
function identity<T>(arg: T): T {
  console.log(arg.length)
  return arg;
}
```

- 通过多个泛型之间继承约束
```ts
// 对象拷贝
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let id in source) {
        target[id] = (<T>source)[id];
    }
    return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });
```
如上，`T`继承`U`，保证了`U`中不会出现`T`中没有的的字段。

- 使用`keyof`或`extends`进行约束


### 泛型接口
使用接口定义函数结构时，可加入泛型
```ts
interface CreateArray {
  (length: number, value: any): any;
}
// 加入泛型
interface CreateArray {
  <T>(length: number, value: T): Array<T>;
}
// 写法二
interface CreateArray<T> {
  (length: number, value: T): Array<T>;
}
```


### 泛型类
与接口类似
```ts
class AddFunc<T> {
  // 静态属性不可使用泛型，如 static init: T;
  init: T;
  add: (x: T, y: T) => T
}
let myAddFunc = new AddFunc<number>()
myAddFunc.init = 1
myAddFunc.add = function(x, y) {
  return this.init + x + y
}
console.log(myAddFunc.add(2, 3))  // 6
```
注：类的静态属性不可使用泛型类型

#### 泛型中使用类类型
```ts
class Test {
  init= 1;
}
function create<T>(c: {new(): T}): T {
  return new c()
}
let testVal = create(Test)
console.log(testVal)  // Test { init: 1 }
```


### 泛型参数的默认类型
类似于默认参数，参数也可指定默认类型
```ts
interface CreateArray<T = string> {
  (length: number, value: T): Array<T>;
}
// 此处使用时可不用指定类型，默认为 string 类型
let create: CreateArray;
```

泛型参数的默认类型遵循以下规则：
- 有默认类型的类型参数被认为是可选的；
- 必选的类型参数不能在可选类型参数的后面；
- 如果类型参数有约束，则默认类型必须满足这个约束；
- 指定类型实参时，只须指定必选类型参数，未指定的采用默认类型；
- 若指定了默认类型，且类型推断无法选择一个候选类型，那么将使用默认类型作为推断结果；
- 一个被现有类或接口合并的类或接口的声明，可以为现有类型参数引入默认类型；
- 一个被现有类或接口合并的类或接口的声明，可以引入新的类型参数，只要它指定了默认类型。


### 泛型条件类型
```ts
T extends U ? X : Y
```
如上，表示若`T`类型满足`U`类型的约束，则返回`X`，否则返回`Y`。
条件类型常与`infer`结合使用。见**泛型工具类型**处示例。


### 泛型工具类型
ts内置常用工具类型：Partial、Required、ReadOnly、Record、ReturnType等。

#### `Partial`
`Partial`的作用就是将某个类型里的属性全部变为可选项`?`
```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```
示例：
```ts
interface Person {
  name: string;
  age: number;
}
type TestPerson = Partial<Person>
/*
{
  name?: string;
  age?: number;
}
*/
const yourInfo: Person = {
  name: 'wu',
  age: 18
}
const myInfo: TestPerson = {}
```

#### `Record`
`Record`的作用就是将某个类型中的所有属性的值转化为另一个类型。
```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```
示例：
```ts
interface NewPage {
  title: string;
}
const x: Record<Page, NewPage> = {
  home: { title: 'home' },
  about: { title: 'about' },
  contact: { title: 'contact' }
}
```

#### `Pick`
`Pick`的作用就是将某个类型中的子属性复制出来，变成这个类型的子类型。
```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
示例：
```ts
interface NewPage {
  title: string;
  name: string;
  desc: string;
}
type PageDesc = Pick<NewPage, "title" | "name">
/*
PageDesc = {
  title: string;
  name: string;
}
*/
```

#### `Exclude`
`Exclude`的作用就是将某个类型中的属于另一个类型移除掉。
```ts
type Exclude<T, U> = T extends U ? never : T;
```
示例：
```ts
type Test1 = Exclude<"a" | "b" | "c", "d">   // "a" | "b" | "c"
type Test2 = Exclude<"a" | "b" | "c", "a">   // "b" | "c"
type Test3 = Exclude<"a" | "b" | "c", "a" | "b"> // "c"
```

#### `ReturnType`
`ReturnType`的作用就是获取函数的返回类型。
```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```
示例：
```ts
type T0 = ReturnType<() => string>; // string
type T1 = ReturnType<(s: string) => void>; // void
type T2 = ReturnType<<T>() => T>; // unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[]
type T4 = ReturnType<any>; // any
type T5 = ReturnType<never>; // never
```


### 使用泛型创建对象