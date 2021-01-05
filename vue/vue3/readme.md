# Vue3学习

## 安装
`npm install @vue/cli -g`
或
`yarn global add @vue/cli`

## 创建项目
1. `vue create vue3`
```shell
$ vue create vue3
? Please pick a preset: (Use arrow keys)
> Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
  Manually select features
```
注：gitbash工具无法上下移动选择时，可使用`winpty vue.cmd create vue3`；默认选择vue2，创建后使用`yarn add vue-next`可自动升级到vue3

2. vite安装
```shell
# 安装
$ yarn create vite-app vite-vue3
# 启动
$ cd vite-vue3/
$ yarn
$ yarn dev
```

## 与Vue2的区别
### 实例创建
Vue2
```js
import Vue from 'vue'
import App from './App.vue'
new Vue({
  render: h => h(App)
}).$mount('#app')
```
Vue3
```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 生命周期函数
| Vue2 | Vue3 |
| ---- | ---- |
| beforeCreate | / |
| created | / |
| beforeMount | onBeforeMount |
| mounted | onMounted |
| beforeUpdate | onBeforeUpdate |
| updated | onUpdated |
| beforeUnmount | onBeforeUnmount |
| unmounted | onUnmounted |
| errorCaptured | onErrorCaptured |
| renderTracked | onRenderTracked |
| renderTriggered | onRenderTriggered |

- Vue2: 作为实例属性
- Vue3
```js
// 按需引入
import { defineComponent, onMounted } from 'vue'

export default defineComponent ({
  setup() {
    onMounted(() => {

    })
  }
})
```

### 数据模型
- Vue2
```js
export default{
  // template使用：name
  data() {
    return {
      name: '张三'
    }
  }
}
```

- Vue3
```js
import { reactive } from 'vue'

export default {
  setup () {
    const state = reactive({
      name: '张三',
    })
    // template使用：state.name
    return { state }
  }
}
```
reactive: 响应式数据。


