## 前言
懒加载就是延迟加载/按需加载，即在需要的时候才加载。vue是单页面应用，当项目比较大时，首次访问页面若要加载全部的组件，则会出现白屏问题，懒加载就是为了提高首屏加载速度。

方法：
- vue异步组件
- ES中的import
- webpack 分组打包

## vue异步组件
```javascript
// 正常写法
import HelloWorld from '@/components/HelloWorld'
component: HelloWorld

// 异步写法
component: resolve=>(require(["@/components/HelloWorld"],resolve))
```

## ES中的import（推荐）
```javascript
const HelloWorld = ()=>import("@/components/HelloWorld")
component: HelloWorld
```

## webpack 分组打包
1. 指定了相同的`webpackChunkName`，会合并打包成一个js文件
```javascript
const HelloWorld = () => import(/* webpackChunkName: "Demo" */ '@/components/HelloWorld')
component: HelloWorld
```

2. webpack提供的 requrie.ensure()，也会相同chunkName的多个路由打包成一个js文件
```javascript
// 语法
require.ensure(dependencies: String[], callback: function(require), chunkName: String)
```
```javascript
const HelloWorld = r => require.ensure([], (r) => r(require('@/components/HelloWorld')), 'Demo')
component: HelloWorld
```

## 其他：组件懒加载
同路由懒加载相似
```html
<!-- const 方法 -->
<script>
const One = ()=>import("./one");
export default {
  components:{
    "One-com":One
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
```

```html
<!-- 异步方法 -->
<script>
export default {
  components:{
    "One-com":resolve=>(['./one'],resolve)
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
```
