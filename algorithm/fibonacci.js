// 斐波那契数列
// 递归的优化

// 普通版：
// let count = 0;  // 递归函数执行的次数
// function fibonacci(n) {
//   count++;
//   if (n <= 0) {
//     return -1;
//   }
//   if (n == 1 || n == 2) {
//     return 1;
//   }
//   if (n > 1) {
//     return fibonacci(n-1) + fibonacci(n-2);
//   }
// }
// let result = fibonacci(20);
// console.log(result, count);   // 6765 13529
// 递归次数太多，通过 for 或 while 来代替递归

// 优化版：
// let count = 0;
// function fibo(n) {
//   let cache = {};  // 缓存计算结果
//   function _fibo(n) {
//     if (cache[n]) {
//       return cache[n];
//     }
//     count++;
//     if (n == 1 || n == 2) {
//       return 1;
//     }
//     let prev = _fibo(n-1);
//     cache[n-1] = prev;
//     let next = _fibo(n-2);
//     cache[n-2] = next;
//     return prev + next;
//   }
//   return _fibo(n);
// }
// console.log(fibo(20), count);  // 6765 20
// 递归次数大大减少

// 尾递归优化：
let count = 0;
function fibonacci(n, ac1 = 1, ac2 = 1) {
  count++;
  if (n <= 1) {
    return ac1;
  }
  return fibonacci(n-1, ac2, ac1 + ac2);
}
console.log(fibonacci(20), count);   // 6765 20