const userModel = require('../lib/mysql.js');
const md5 = require('md5');
const checkNotLogin = require('../middlewares/check.js').checkNotLogin;

exports.getSignin = async ctx => {
  // 检查用户是否登录
  await checkNotLogin(ctx);
  await ctx.render('signin', {
    session: ctx.session
  });
}

exports.postSignin = async ctx => {
  console.log(ctx.request.body);
  // "name=chen&password=123456"
  let {name, password} = ctx.request.body;   // 请求体中解构用户名、密码
  await userModel.findDataByName(name)
    .then(result => {
      let res = result;
      if (res.length && name === res[0]['name'] && md5(password) === res[0]['pass']) {
        ctx.session = {
          // 种 session，每个用户的session都不同，id可用于查询
          user: res[0]['name'],
          id: res[0]['id']
        }
        ctx.body = {
          code: 200,
          message: '登录成功'
        }
        console.log(ctx.session.id);
        console.log(ctx.session);
        console.log('登录成功');
      } else {
        ctx.body = {
          code: 500,
          message: '用户名或密码错误'
        }
        console.log('用户名或密码错误');
      }
    })
}