# TypeScript
TypeScript是JavaScript的超集

## 安装
<hr>

- `npm install -g typescript`
- 安装Visual Studio的TypeScript插件

## 使用
<hr>

### 编译
命令行`tsc file.ts`，即可生成`file.js`编译后的文件
- 编译出错仍可生成js文件
- 监视：`tsc -w`，检测到文件变化后自动进行编译

<hr>

### 运行
- 安装`ts-node`：`npm install -g ts-node`
- 运行：ts-node file.ts

<hr>

### 基础类型
- boolean
- number
- string
- Any
可移除类型检查
```typescript
let a: any = 1
a = '张三'  // ok
```

- Void
无类型，函数无返回值时，其返回值类型为`void`，变量类型为`void`时，只能将`undefined`及`null`赋值给它

- null/undefined
所有类型的子类型，可将其赋值给其他类型（如number）。编译时指定`--strictNullChecks`，则只能赋值给void及其本身。
```typescript
// --strictNullChecks 模式下报错
let a: number = undefined
a = null
let b: undefined = null
let c: null = undefined
```

- Never
表示永不存在的值的类型，如抛出的异常、无返回值的表达式（如调用不会结束的函数）、箭头函数表达式返回值的类型。所有类型的子类型，只有其本身才能赋值给它。

### 对象类型
- 数组
```typescript
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]

// 多种类型数组
let arr3: (number | string)[] = [1, 'a', 2]

// 数组中对象类型的定义
let arr4: { name: string, age: number }[] = [
  { name: '张三', age: 18 }
]
// 可写为如下
// 1. 类型别名
type Person = { name: string, age: number }
let arr5: Person[] = [
  { name: '张三', age: 18 }
]
// 2. 类
class Man = { name: string, age: number }
let arr6: Man[] = [
  { name: '张三', age: 18 }
]
```

- 元组 Tuple
已知元素数量及类型的数组，访问越界元素时，会使用联合类型(string | number)
```typescript
let arr: [string, number]
x = ['a', 1]
x[3] = 'b'
x[4] = true // Error，true不是联合类型
```
注：
1) `Typescript2.7`后，不可再越界访问了，push后的越界元素也无法通过下标获取，但编译成js后还是可以正常运行的。
2) 元组与数组的区别：元组元素类型位置固定，不可越界访问；元组还可用于处理`csv`文件内数据(分号分隔每行，逗号分隔元素)。
```typescript
// 元组类型的数组
const school: [string, string, number][] = [
  ["张三", "学生", 18],
  ["罗翔", "教师", 28]
]
```

- 枚举 enum
```typescript
enum Color{ red = 1, green, blue }
let color: Color = Color.green    // 2
let colorName: string = Color[2]  // green
```
注：没有设置值时，默认为下标；上一个值为数字时，当前值默认为上一值+1；上一值为非数字时，必须设置当前值。

- Object
非原始类型

- 联合类型
```typescript
type Combinable = string | number
function func(val: Combinable): number {
  // ...
}
```

- 函数类型
```typescript
const zhangSan: () => string = () => {
  return '张三'
}
```

<hr>

### 接口
1. 接口可定义数据的结构及类型，参数可为函数类型，参数可选时加`?`
```typescript
interface Person {
  name: string;
  age?: number;
}
function greeter(person: Person) {
  return `I am ${person.name}, I'm ${person.age} years old.`
}
let user = { name: '张三', age: 18 }
console.log(greeter(user))
```

2. 可往接口中加入任意值
```typescript
interface Person {
  name: string;
  age?: number;
  [propname: string]: any;
}
const girl = {
  name: '仙女',
  age: 18,
  height: 168 // 任意值
}
```

3. 接口和类型别名的区别：接口必须代表对象，类型别名可直接给类型
```typescript
// 类型别名
type GirlType = string;
// 接口
interface Girl {
  name: string,
  age: number
}
```

4. 接口的实现
接口描述了类的公共部分
```typescript
interface Person {
  name: string;
  age?: number;
  say(): string
}
class XianNv implements Girl {
  name = '七仙女'
  age = 18
  say() {
    return `I am ${this.name}, I'm ${age} years old.`
  }
}
```

5. 接口的继承
一个接口可继承多个接口（合成接口）
```typescript
interface Person {
  name: string,
  age?: number
}
interface Girl {
  hair: string
}
interface Teacher extends Person, Girl {
  subject: string
}

let chen = <Teacher>{}
chen.name = 'chenjiaqi'
chen.hair = 'short'
chen.subject = 'math'
```

<hr>

### 类
1. 创造类
在构造函数的参数上使用`public`等同于创建了同名的成员变量
```typescript
class Student {
  description: string;
  constructor(public name, public age) {
      this.description = `I am ${name}, I'm ${age} years old.`
  }
}

interface Person {
  name: string;
  age: number;
}

function greeter(person: Person) {
  return person.description
}
// user将有三个成员变量
let user = new Student("张三", 18)  
console.log(greeter(user))
```

2. 类的继承
类可继承另一个类的属性与方法，子类可重写父类方法
```typescript
class Lady {
  content = 'Hello!'
  sayHello() {
    return this.content
  }
}
class Girl extends Lady {
  sayLove() {
    return 'I love you'
  }
  // 类方法的重写
  sayHello() {
    return 'Hi, my darling!'
  }
}
let chen = new Girl()
console.log(chen.content)   // Hello!
console.log(chen.sayHello())  // Hi, my darling!
```

3. super关键字
- super可调用父类的方法
```typescript
class Girl extends Lady {
  // 类方法的重写
  sayHello() {
    return super.sayHello() + ', my darling!'
  }
}
```

- 子类若有构造函数，则必须显式调用父类构造函数，即`super()`，父类无构造函数也要调用`super()`
```typescript
class Person {
  constructor(public name: string) {}
}
class Teacher extends Person {
  constructor(public age: number) {
    super('chen')
  }
}
```

4. 类的访问类型
- `public`：无访问限制
- `private`：只能在本类中访问
- `protected`：只能在本类及继承的子类中访问（多重继承亦可）

5. Getter、Setter
私有变量的获取与赋值
```typescript
class Girl {
  constructor (private _age: number) {}
  get age() {
    return this._age
  }
  set age(age: number) {
    this._age = age
  }
}
let chen = new Girl(18)
console.log(chen.age)   // 18
chen.age = 16
console.log(chen.age)   // 16
```

6. 类中的`static`
若类中的方法被声明为`static`，则可不需要new对象，可直接调用。
`static`方法中不可引用类中的成员变量。
```typescript
class Girl {
  static sayHello() {
    return 'Hi'
  }
}
Girl.sayHello() // Hi
```

7. `readonly`只读属性
成员变量赋初值后不可更改
```typescript
class Girl {
  public readonly name: string
  constructor (name: string) {
    this.name = name
  }
}
let chen = new Girl('chen')
chen.name = 'chenjiaqi' // Error
```

8. 抽象类
抽象类就是每个继承它的类都必须实现其中的抽象方法，抽象类及其抽象方法都用`abstract`开头。
```typescript
abstract class Developer {
  abstract skill()
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
```

<hr>

### 函数
#### 声明及传参
```typescript
function getInfo(name: string, age?: number, hometown: string = '北京'): string {
  return `I am ${name}, I'm ${age} years old, I come from ${hometown}`
}
```
注：参数及返回值可指定类型；?表示此参数可不传，默认为`undefined`，可设置默认值。

#### 剩余参数
未定义的剩余参数可转换为数组
```typescript
function getSum(num1: number, num2: number, ...arr: number[]) {
  let sum: number = num1 + num2
  arr.forEach(i => sum += i )
  return sum
}
```

#### 重载
当函数参数涉及到联合类型时，对不同类型的参数可能会有不同的处理，使用函数重载可更好地判断参数。<br>
1. 函数重载
```typescript
type Combinable = string | number
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('1', 2)
result.split(' ')
```
最后一句将编译出错，因为add返回类型有可能为`number`，而`number`没有`split`方法。<br>
解决：为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用。
```typescript
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
const result = add('1', 2)
result.split(' ')
```
注：此处定义了四个重载方法，调用函数时，将查找重载列表，查到匹配的则使用，所以可能性最高的重载方法应放在最前面。

2. 方法重载：同一类中方法同名
3. 构造函数重载
4. 特定重载签名
<br>
可利用签名来创建参数名称、类型、数量都相同，但返回类型不同的多个函数
```typescript
// typescript/lib/lib.dom.d.ts
createEvent(eventInterface: "KeyboardEvent"): KeyboardEvent; // 特定重载签名
createEvent(eventInterface: "MouseEvent"): MouseEvent; // 特定重载签名
createEvent(eventInterface: "TouchEvent"): TouchEvent; // 特定重载签名
createEvent(eventInterface: string): Event; // 非特定重载签名
```

5. 使用接口搭配重载签名或非重载签名
```typescript
interface addVal {
  (a: number, b: number): number;
  (a: string, b: string): string;
  (a: string, b: number): string;
  (a: number, b: string): string;
}
let addFunc: addVal = function (a, b) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const res = addFunc('1', 2)
res.split(' ')
```

参考：
- [Typescript 函数重载](http://www.semlinker.com/ts-function-overload/)
- [Typescript 常见的几种函数重载方法详解与应用示例](https://blog.csdn.net/weixin_30681615/article/details/96225259)


<hr>

### 配置文件`tsconfig.json`

#### 使用配置文件
- 创建`tsconfig.json`：tsc --init
- 编译：tsc，即可编译根目录下所有ts文件
- `ts-node`也遵循配置文件

#### 配置项
- `include`：要编译的文件、文件夹；可以使用相对路径、绝对路径，还可使用通配符。
- `exclude`：要排除的文件、文件夹，规则同`include`。
- `files`：要包含的文件，文件名必须用双引号，files与include的区别在于files不可用通配符。
- `complilerOptions`配置项：
  - `removeComments`：移除注释
  - `strict`：严格模式
  - `noImplicitAny`：为true时表示，就算类型为any，也要注解
  - `strictNullChecks`：为true，表示强制检查null类型
  - `rootDir`：起始编译目录
  - `outDir`：编译输出目录
  - `outFile`：编译输出文件，将所有文件编译成一个文件；配置后不再支持`"module": "commonjs"`，需改成`"module": "amd"`
  - `target`：编译目标
  - `allowJs`：是否编译js文件，可编译es6
  - `sourceMap`：为true时会生成`sourceMap`信息文件，存储位置信息，代码出错时可定位到编译前的出错位置
  - `noUnusedLocals`：不允许存在没有被使用的常量/变量/方法
  ```ts
  // 会提示错误
  const chen: string = null;
  export const name = "chen";
  ```
  - `noUnusedParameters`：不允许存在没有被使用的参数

[其它配置：https://www.tslang.cn/docs/handbook/compiler-options.html](https://www.tslang.cn/docs/handbook/compiler-options.html)


<hr>

### 联合类型及类型保护
#### 联合类型
联合类型就是一个变量有两种或以上可能的类型
```ts
type CombineType = string | number | boolean
```

#### 类型保护
1. 类型断言
表示不进行数据检查及解构，事先为变量选择一种类型。两种方式：`<类型>值` | `值 as 类型`， jsx 这样的语法中只支持 as 方式。
```typescript
function func(val: string | number): number {
  if (val.length) {
    return val.length
  } else {
    return val.toString().length
  }
}
```
如上所示，参数`val`是一个联合类型，可为`string`及`number`，而访问联合类型值的属性时，必须是所有可能类型共有的属性，而`val`为`string`时，没有`length`属性，所以编译不通过。使用类型断言则可编译通过。
```typescript
function func(val: string | number): number {
  if ((val as string).length) {
    return (val as string).length
  } else {
    return val.toString().length
  }
}
```

2. `in`语法
用`in`判断对象中是否有此属性/方法，有则使用

3. `typeof``instanceof`语法
用`typeof`判断类型，`instanceof`同理
```typescript
function func(val: string | number): number {
  if (typeof val === 'string') {
    return (val as string).length
  } else {
    return val.toString().length
  }
}
```

<hr>

### 泛型
[参见“generics.md”](./generics.md)

<hr>

### 命名空间
命名空间相当于模块化，可将某些类或变量隐藏起来，避免造成全局污染。
示例：
```ts
namespace Home {
  class Header {
    constructor() {
      console.log('Header')
    }
  }
  class Content {
    constructor() {
      console.log('Content')
    }
  }
  class Footer {
    constructor() {
      console.log('Footer')
    }
  }
  export class Page {
    constructor() {
      new Header()
      new Content()
      new Footer()
    }
  }
}

// 只可访问Page类，Header、Content、Footer都被隐藏起来了
new Home.Page()
```
注：可利用命名空间封装组件。

- 子命名空间：命名空间可嵌套
 ```ts
namespace Components {
  export namespace subComponents {
    export class Page {}
  }
}
// 使用
Components.subComponents.Page
 ```

 <hr>

### `import`语法
- 创建模块并`export`输出
```ts
// components.ts
export class Header {
  constructor() {
    console.log('Header')
  }
}
```
- 引入模块
```ts
// page.ts
import { Header } from './components'

export default class Page {
  constructor() {
    new Header()
  }
}
```
编译后生成amd 规范的代码，不可直接在浏览器中运行，可在node中运行，引入`require.js`后可支持。
`require.js`可解析amd规范的代码，浏览器引入模块方式如下：
```js
// index.html
require(["page"], function (page) {
  new page.default();
});
```

<hr>

### 在Typescript中使用其他类库
如`JQuery`
1. script标签引入
引入jq库后，在使用的ts文件中声明$——`declare var $: (selector: string) => any;`即可使用并且不报错

2. typings
- 安装`typings`：`npm install -g typings`
- 搜索jquery库：`typings search jquery`
- 安装ts的jquery库：`typings install dt~jquery --global`
- 安装js的jquery库：`npm install jquery --save`
```ts
import $ from 'jquery'
console.log($)
```
注：安装js的jquery库后，在开发环境的ts中可使用了，但会有错误提示，使用typings安装jquery后就无错误提示了。

3. @types/jquery
- 安装`@types/jquery`：`npm install --save-dev @types/jquery`
- 安装js的jquery库：`npm install jquery --save`
```ts
import $ from 'jquery'
console.log($)
```
