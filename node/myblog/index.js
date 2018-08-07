const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

// 启用 ejs 模板(模板配置)
// 指定模板的路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
  console.log('1');
  next();  // 转交给下一个中间件
})

app.use((req, res, next) => {
  console.log('2');
  // res.status(200).end();  // 结束中间件流程
  next(new Error('haha'));
})

// 启用中间件，路由中间件
app.use('/', indexRouter);

app.use('/users', userRouter);

// 异常捕获
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Something broke');
})

// koa 中回调函数参数为 ctx (结合了 req res)
// app.get('/users/:name', function(req, res) {
//   // :params 参数  ?query 查询字符串
//   res.send('Hello, ' + req.params.name)
// })

app.listen(3000);