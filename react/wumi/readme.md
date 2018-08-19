1. umi 极快，内置了 react react-router
以约定代替、简化代码，pages/目录下组件即路由

2. layout 业务

3. proxy
可实现前端代理跨域

发送一个 rest 请求,但并没有创建路由
通过 umi-plugin-datahub 插件，.umirc.js 文件里配置
/restapi/shopping/

easy_mock   https://www.easymock.com/restapi
easy_mock 允许跨域 --> allow alll origin  后端路由

koa 后端路由  koa-cors  8000 向 3000 请求数据
http://localhost:3000/restapi

前端代理的方式：
proxy , proxyTable（前端跨域解决方式）
拦截所有的请求，有一个代理规则，需要匹配规则