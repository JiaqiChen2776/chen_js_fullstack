# TypeScript
TypeScript是JavaScript的超集

## 安装
- `npm install -g typescript`
- 安装Visual Studio的TypeScript插件

## 使用
### 编译
命令行`tsc file.ts`，即可生成`file.js`编译后的文件
<br>
编译出错仍可生成js文件

### 运行
- 安装`ts-node`：`npm install -g ts-node`
- 运行：ts-node file.ts

### 基础类型
- boolean
- number
- string
- 数组
```typescript
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
```

- 元组 Tuple
已知元素数量及类型的数组，访问越界元素时，会使用联合类型(string | number)
```typescript
let arr: [string, number]
x = ['a', 1]
x[3] = 'b'
x[4] = true // Error，true不是联合类型
```

- 枚举 enum
```typescript
enum Color{ red = 1, green, blue }
let color: Color = Color.green    // 2
let colorName: string = Color[2]  // green
```
注：没有设置值时，默认为下标；上一个值为数字时，当前值默认为上一值+1；上一值为非数字时，必须设置当前值。

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

- Object
非原始类型

- 类型断言
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
联合类型可定义
```typescript
type Combinable = string | number
function func(val: Combinable): number {
  // ...
}
```

### 接口
接口可定义数据的结构及类型
```typescript
interface Person {
  name: string;
  age: number;
}
function greeter(person: Person) {
  return `I am ${person.name}, I'm ${person.age} years old.`
}
let user = { name: '张三', age: 18 }
console.log(greeter(user))
```

### 类
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





