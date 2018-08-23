# nuxt

安装：yarn add nuxt

对比：
- SPA 单页应用
vue-cli webpack SPA(切换页面时非常快) 
js接管了路由，路由映射组件
都在 webpack 打包的一个 bundle.js 里
优点：用户体验提升
缺点：SEO极差

SPA 挂载点 #root，不依赖于 SEO
SEO 只能分析 html，只可拿到根节点 #root

例如：
有赞 SPA是在微信里
今日头条：SPA在App里
不依赖于 SEO
但例如博客一样的pc端或移动端的web应用，SEO很重要

解决 SPA 中 SEO 不友好的问题：
ssr --> server side rendering
template compile html server 端 (服务器端编译 html)
koa express 将 html res.send/ctx.body = html 发送到页面中
client --> mounted 挂载组件
 
- nuxt 多页应用
1. SEO
title 标题是 SEO 中最重要的配置，直接配置：
head: {
  title: 'Home page'
}

创建组件：
全局组件 --> Vue.component

nuxt.config.js 配置:
plugins

过滤器：
{{ article.content | cutString(180) }}
| 过滤器 filter 对内容进行格式化
