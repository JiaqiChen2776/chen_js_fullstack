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

#### `onRenderTracked`状态跟踪
- `onRenderTracked`会跟踪页面上所有响应式的变量和方法，只要有Update，就会触发。
- 需要从vue中引入，参数为`event`

#### `onRenderTriggered`状态触发
- 只跟踪发生变化的值
- 需从vue中引入，参数为`event`，其中属性如下：
  - key 那个变量发生了变化
  - newValue 更新后变量的值
  - oldValue 更新前变量的值
  - target 目前页面中的响应变量和函数

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

#### reactive 
响应式数据：接收一个对象然后返回该对象的响应式代理。等同于Vue2.x的`Vue.observable()`，若要对一个单独的变量使用响应式，可使用`ref`。
两种返回形式：
1. 如上代码所示，声明`state`并返回，使用时需要`state.name`
2. 引用`toRefs`，返回时用`...`展开，使用时无需加`state`
```js
import { reactive, toRefs } from 'vue';

export default defineComponent({
  setup () {
    const state = reactive({ 
      name: '张三' 
    })
    return { ...toRefs(state) }
  }
})
```

#### toRefs 
响应式对象转为普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。
> 若`reactive`返回的对象内嵌套了多层的对象，那嵌套的对象就不是响应式的，用`toRefs`处理后，整个对象的所有属性都是响应式的。

#### ref
接收一个参数值并返回一个响应式可改变的对象，其中包含了一个指向内部值的属性`value`。
```js
const age = ref(18)
age++     // 可改变
console.log(age.value)  // 19
```

#### toRef
可为一个`reactive`对象的属性创建一个ref，此ref可被传递并保持响应。
```js
const state = reactive({
  name: '张三',
})
const nameRef = toRef(state, 'name')
nameRef = '李四'

console.log(nameRef)  // 李四
console.log(state.name)  // 李四
```

### watch
- import从vue中引入watch
- 参数：第一个参数是要监听的值，监听多个值时用数组（同理回调的newVal、oldVal也是数组），第二个参数是回调函数
```ts
watch(selectVal, (newVal, oldVal) => {
  document.title = newVal
})
```

### Teleport
“任意传送门”，可将子节点渲染到存在于父组件之外的Dom节点。
vue2中可通过第三方库`portal-vue`来实现。

利用`teleport`来创建一个Toast提示功能，如下：
- 首先在`index.html`中的app节点外新增一个节点；
```html
<div id="app"></div>
<div id="toast"></div>
```
- 在App.vue中，添加`teleport`
```html
<button @click="showToast">toast提示</button>
<teleport to='#toast'>
  <div v-if="visible" class="show-toast">
    Toast 提示内容
  </div>
</teleport>
```
```ts
import { defineComponent, reactive, toRefs } from 'vue'
export default defineComponent({
  name: 'App',
  setup () {
    const data = reactive({
      visible: false,
      timer: 0,
      showToast: () => {
        data.visible = true
        clearTimeout(data.timer)
        data.timer = setTimeout(() => {
          data.visible = false
        }, 2000)
      }
    })
    return {
      ...toRefs(data)
    }
  }
})
```

### Suspense异步组件
Suspense组件可等待数据获取，两个`template`包含两种不同状态，`#default`展示正式的内容，`#fallback`展示未加载完成时的内容。
定时器模拟异步请求，页面显示“Loading...”，3秒后显示“success”，示例如下：
- 父组件
```vue
<template>
  <Suspense>
    <template #default>
      <Async></Async>
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>

<script>
import { defineComponent } from 'vue'
import Async from './components/Async.vue'
export default defineComponent({
  name: 'App',
  components: {
    Async
  }
})
</script>
```

- 子组件 Async
```vue
<template>
  <h1>{{ result }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  async setup () {
    const getData = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve('success')
        }, 3000)
      })
    }
    const result = await getData()
    return {
      result: result
    }
  }
})
</script>
```
