const fs = require('fs'),
  path = require('path'),
  _Promise = require('bluebird')
  
_Promise.config({
    cancellation: true
  })

// 1. 异步回调方式
fs.readFile(path.join(__dirname, './a.txt'), 'utf-8', (err, data) => {
  if (err) {
    return console.error('err:', err)
  }
  console.log('data:', data)
})

// 2. 同步方式
// -- promisifyAll 将对象中所有方法转换成使用Promise形式 --
_Promise.promisifyAll(fs)
fs.readFileAsync(path.join(__dirname, './a.txt'), 'utf-8')
  .then(data => {
    console.log('data:', data)
  })
  .catch(err => {
    console.error('err:', err)
  })
// -- promisify 将单个方法转换成Promise形式 --
/*const readFile = _Promise.promisify(fs.readFile)
readFile(path.join(__dirname, '../static/a.txt'), 'utf-8')
  .then(data => {
    console.log('data:', data)
  })
  .catch(err => {
    console.error('err:', err)
  })*/

// 3. 创建Promise
let promise = new _Promise((resolve, reject) => {
  let r = Math.random()
  if (r > 0.5) {
    resolve(`value: ${r}`)
  } else {
    reject(`rejected value: ${r}`)
  }
})
promise.then(console.log)
  .catch(console.error)
console.log('isPending:', promise.isPending())
console.log('isFulfilled:', promise.isFulfilled())
console.log('isRejected:', promise.isRejected())
console.log('isCancelled:', promise.isCancelled())
// console.log('value:', promise.value())
// console.log('reason:', promise.reason())

// 4. spread 回调参数，数组转独立参数
_Promise.resolve([1, 2, [3, 4]])
 .spread((v1, v2, v3) => console.log(v1, v2, v3));

// 5. reject 错误捕获
_Promise.reject('reject error')
  .error(err => console.log('error:', err))
  .catch(TypeError, (err) => console.error('catch error:', err))
  .finally(() => console.log('done'))
// catch 方法有两种使用方式。
// 第一种方式只添加回调方法，会捕获所有错误情况；
// 第二种方式是使用错误对象类型或断言（predicate）来对错误进行过滤。
// error 方法的作用与 catch 类似，但是 error 只会处理真正的 Error 对象。

// 6. 取消
// 默认不可取消，需要配置。取消不会影响promise中的异步操作，而是不关心promise的结果。
let promise2 = _Promise.delay(1000, 'hello')
promise2.then(console.log)
  .cancel()
console.log('isCancelled:', promise2.isCancelled())

// 7. 批量处理
/* 
  1) all：接收一个异步操作数组，依次执行，任何一个操作错误都会导致结果Promise被拒绝
  2) map：第一个参数为遍历的数组，第二个参数为异步处理函数
  3) mapSeries：与map类似，按数组顺序依次执行
  4) some：第一个参数为异步操作数组，第二个为Promise完成数量（达到则返回），结果为一个数组
  5) any：参数为异步操作数组，完成一个则返回，结果为单个值
  6) race：与any类似，race的结果有可能是被拒绝的Promise
  7) filter：第一个参数为异步操作数组，第二个参数为过滤处理函数；结果为过滤后的数组（相当于map后，用数组的filter过滤结果）
  8) reduce：第一个参数为遍历的数组，第二个参数为异步处理函数（参数1-total，参数2-value，返回下一次遍历的total值）
  9) all：用来处理动态数量的 Promise
  10) join 用来处理固定数量的不相关的 Promise
  11) method：用来封装一个方法，使其返回 Promise
  12) try：用来封装可能产生问题的方法调用，并根据调用结果来决定 Promise 的状态
*/

// 8. 结果处理
/*
  1) call: 调用结果对象中的方法
  2) get: 获取结果对象中的属性
  3) return: 改变结果
  4) throw: 抛出错误
  5) catchReturn: 捕获错误后，改变结果
  6) catchThrow: 捕获错误后，抛出新的错误
  7) tap: 查看结果
  8) tapCatch: 查看错误
*/


// 9. 全局错误捕获
/*
  1) unhandledRejection: 拒绝错误未被处理时触发
  2) rejectionHandled: 发生拒绝错误时触发
  3) onPossiblyUnhandledRejection: 添加对于未处理的拒绝错误的默认处理方法
  4) suppressUnhandledRejections: 忽略未处理的拒绝错误
*/

// 10. 定时器
/*
  1) delay: 延迟执行
  2) timeout: 在指定时间内未执行完，则抛出TimeoutError错误
*/

// 11. 资源管理
/*
  1) using
  2) disposer
*/
class Connection {
 query() {
   return _Promise.resolve('query');
 }
 close() {
   console.log('close');
 }
}

class DB {
 connect() {
   return _Promise.resolve(new Connection());
 }
}

const disposer = new DB().connect().disposer(connection => connection.close());
_Promise.using(disposer, connection => connection.query())
 .then(console.log).catch(console.error);

