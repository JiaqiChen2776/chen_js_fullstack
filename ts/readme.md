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

- Any
可移除类型检查
```typescript
let a: any = 1
a = '张三'  // ok
```

- Void
无类型，函数无返回值时其返回值类型为`void`，变量类型为`void`时，只能将`undefined`及`null`赋值给它

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

