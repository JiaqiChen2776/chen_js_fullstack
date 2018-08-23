// import 是 es6 的语法，node环境下不支持
// 使用 babel-core 将 es6 转换成 es5 再执行
// 安装：yarn add bebel-core babe-preset-stage-3 babel-preset-lastest-node -D
// 在start.js中引入并配置
import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
// 访问静态资源
import KoaStatic from 'koa-static'
// post 提交的表单由 bodyParser 处理
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
// 解决跨域问题
import cors from '@koa/cors'
import globalConfig from './config'

// 启动
async function start() {
  const app = new Koa();
  app.use(cors())
  app.use(bodyParser())
  app.use(KoaStatic('.'))
  app.listen(3000)
  console.log('Server listening on 3000 port')
}

start()