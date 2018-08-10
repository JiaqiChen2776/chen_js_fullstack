const Koa = require('koa');
const path = require('path');
// koa-bodyparser --> 异步处理 post 请求
const bodyParser = require('koa-bodyparser');
const MysqlStore = require('koa-mysql-session');
const session = require('koa-session-minimal');
const router = require('koa-router');
const ejs = require('ejs');
const views = require('koa-views');
// 静态资源服务器，可不用绝对路径
const staticCache = require('koa-static-cache');
const config = require('./config/default.js');

const app = new Koa();

const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
};

app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}));

app.use(staticCache(path.join(__dirname, './public'), {
  // 动态
  dynamic: true
}, {
  maxAge: 365*24*60*60
}))

app.use(staticCache(path.join(__dirname, './images'), {
  // 动态
  dynamic: true
}, {
  maxAge: 365*24*60*60
}))

app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));

app.use(bodyParser({
  formLimit: '1mb'
}));

app.use(require('./routes/posts.js').routes());
app.use(require('./routes/signup.js').routes());

app.listen(config.port);
console.log(`listening on port ${config.port}`);