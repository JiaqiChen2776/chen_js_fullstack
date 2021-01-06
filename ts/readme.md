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

