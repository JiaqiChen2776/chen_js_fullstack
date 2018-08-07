 # koa express
node server frame 服务器端的开发框架
koa egg ， async await 异步
express 早生一点

单点入口
app 实例化，listen router 分发服务器资源

MVC 模式 --  model view controller
router -> controller  负责接管路由、提供 view
view post|get 一个请求  -> controller  -> model

分析：
/login 路由
- controller 找到 login.js，login.js 提供 login.ejs
                          - login.ejs
                          - form
                            - controller  login.js
                              - models/login.js save


### 安装
yarn add express
yarn add ejs


## app.use()  启用一个中间件

中间件middlewares 提供各种功能服务，数组，顺序，从上到下，用一组中间件（函数）来为用户提供服务
next() 转交控制权
res.end() 结束此次服务

- 中间件
有顺序
中间件按顺序为用户提供服务，可提前终止
next();  // 转交给下一个中间件
res.status(200).end();  // 结束中间件流程


## ejs 模板

<%- %> 引入
<%= %> 值