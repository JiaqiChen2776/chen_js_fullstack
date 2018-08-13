// 返回一个类，有一个 listen 的 api
// 在 nodejs 中，对象继承了 events 后,自动支持发布订阅者模式
// 文件读取、网络请求... 都基于 events
// .listen  与  addEventListener 本质是一样的
const Emitter = require('events');
const http = require('http');

// 中间件：

module.exports = class Application extends Emitter {
  constructor() {
    super();
    // 可加元素，有顺序
    this.middleware = [];
  }
  // 中间件处理函数
  // 中间件是函数数组
  use(fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('moddleware must be a function')
    }
    this.middleware.push(fn);
    return this;
  }
  callback() {
    this.emit('error');
    console.log('callback fro middleware');
  }
  listen(...args) {
    // 启动一个服务器，并监听
    this.on('error', this.onerror);
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }
  onerror() {
    console.log('出错了');
  }
}