const router = require('koa-router')();
const controller = require('../controller/c-signin');

router.get('/signin', controller.getSignin);
router.get('/signin', controller.postSignin);

module.exports = router;