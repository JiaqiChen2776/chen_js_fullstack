const Koa = require('./lib/application');
const app = new Koa();

// http createServer 提供
// 将中间件函数添加到一个 middeleware 数组
// 一个个执行
// koa 由中间件搭建起来的服务
app.use((ctx) => {
  ctx.body = 'hello workd'
})

// app.on('error', this.onerror);

app.listen(1234);