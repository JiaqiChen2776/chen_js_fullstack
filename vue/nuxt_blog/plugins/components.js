import Vue from 'vue'
// 声明全局组件
import TopList from '../components/top-list.vue'

const components = {TopList};

Object.keys(components).forEach(key => {
  // 插入到全局
  Vue.component(key, components[key]);
})