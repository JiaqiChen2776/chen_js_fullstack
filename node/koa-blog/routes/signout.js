const router = require('koa-router')();

router.get('/signout', async(ctx, next) => {
  // 清除 cookie
  ctx.session = null;
  console.log('退出成功');
  ctx.body = true;
})

module.exports = router;