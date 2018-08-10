const router = require('koa-router')();
const controller = require('../controller/c-signup');

// 显示注册表单
router.get('/signup', controller.getSignup);
// 提交表单
router.post('/signup', controller.postSignup);

module.exports = router;