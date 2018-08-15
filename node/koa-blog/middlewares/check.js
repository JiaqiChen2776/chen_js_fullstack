module.exports = {
  // 已登录跳转到 posts 页面
  checkNotLogin: (ctx) => {
    if (ctx.session && ctx.session.user) {
      ctx.redirect('/posts');
      return false;
    }
    return true;
  },
  // 未登录则跳转到登陆页
  checkLogin: (ctx) => {
    if (!ctx.session || !ctx.session.user) {
      ctx.redirect('/signin');
      return false;
    }
    return true;
  }
}