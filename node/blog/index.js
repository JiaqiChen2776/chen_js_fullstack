const path = require('path');
const express = require('express');
const session = require('express-session');
// session 
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 静态资源服务器
// public/
// 分布式的，不止一台服务器，负载均衡
app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port, () => {
  console.log(`listen on port ${config.port}`);
})
