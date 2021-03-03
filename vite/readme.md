## Vite
### 前言
Vite是一个项目初始化构建工具，目前只支持Vue3.x
特点：
- 轻快，冷服务启动，冷服务就是开发预览时无需打包
- 热更新
- 按需编译更新，不会刷新全部DOM节点

### 使用
1. npm
- 创建项目：`npm init vite-app vite-project`
- 进入vite-project，运行`npm install`
- 启动：`npm run dev`

2. yarn
- 创建项目：`yarn create vite-app vite-project`
- 进入vite-project，运行`yarn`
- 启动：`yarn dev`

### 搭建React项目
- 创建文件夹`React-vite`
- 创建项目：`npm init vite-app --template react`
- `npm install`，`npm run dev`

### Vite中的支持
- 支持ts，`<script lant="ts"></script>`
- 支持直接引入`css`、`json`、`jsx`

### Vite配置别名
配置文件`vite.config.js`
```js
const { resolve } = require('path')
export default {
    alias: {
        '/@/': resolve(__dirname, 'src')
    }
}
```
使用：
```js
import HelloWorld from '/@/components/HelloWorld.vue'
import '/@/assets/app.css'
```