# jsonp 跨域接口访问

跨域： 域名、端口、协议 ，任何一个不同都存在跨域问题

js 请求有一个同源机制

后端解决跨域问题 (Koa-cors可接受其它域名的访问)，可学习其源码

前端解决方案 jsonp

## jsonp 
安装：yarn add koa koa-router

后端可以添加白名单限定有哪些域名是可以访问的

前端:

- script 标签可以访问外部跨域脚本或地址（如在index.html中引入Jquery）
- jsonp 利用了 script 的此特点
若访问的是跨域脚本或接口，需要改造一下后端接口，实现 jsonp, json with padding
给返回的数据封装一下，在数据外套个回调函数 callback(data) ，使其可在客户端跑起来
index.html 文件：
```
<script>
    function callback(data) {
        console.log(data);
    }
</script>
<script src="http://localhost:3000/api"></script>
```
注：script 标签顺序问题， script 在 3000 端口下载数据时，将会立即执行 callback() 函数，而此时还未对 callback 进行定义，将会发生阻塞问题。

app.js 文件：
```
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
router.get('/api', (ctx) => {
    const data = {
        name: 'zk',
        age: 18
    }
    ctx.body = 'callback(' + JSON.stringify(data) + ')';
})
app.use(router.routes());
app.listen(3000);
```

- 带参访问
```
<script src="http://localhost:3000/api?jsonpcallback=callback"></script>
```
```
const callback = ctx.query.jsonpcallback;
    if (callback) {
        ctx.body = callback + '(' +JSON.stringify(data) + ')';
    } else {
        ctx.body = data;
}
```


# 手写 ajax

1. 支持同源访问
2. 支持 jsonp 访问

