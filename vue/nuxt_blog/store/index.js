import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

// vuex 单一组件状态树
// actions methods
// mutations 修改state(被保护的状态值)，只有通过mutations 才能修改state
// getters 提供修饰，返回数据


export default () => {
  return new Vuex.Store({
    state: {
      articles: [],
      total: 0,
      user: {
        nickname: '在警察局的前端',
        avatar: 'https://user-gold-cdn.xitu.io/2016/11/29/1f8696d…?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1',
        motto: '每写一行代码都害怕...'
      }
    },
    actions,
    mutations,
    getters
  })
}