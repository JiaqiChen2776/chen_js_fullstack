## 泛型及其应用
泛型（Generics）是指在定义函数、接口、类时不指定类型，而是在使用的时候指定类型。

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

### 泛型约束
使用泛型约束，参数不符时在编译阶段就会报错
```ts
function identity<T>(arg: T): T {
  return arg;
}
```
如上，如果在identity中要打印出arg.length，编译器将报错，因为arg类型未确定，是否有length属性也未确定

通过接口约束
通过多个泛型之间继承约束

### 泛型接口

### 泛型类

### 泛型参数的默认类型