<template>
  <div class="index container">
    <top-list :articles="$store.state.articles"></top-list>
    <p class="load-tip" v-if="isLoading">加载中...</p>
    <p class="load-tip" v-if="noMore">没有更多文章了</p>
  </div>
</template>

<script>
export default {
 head: {
  //  标题是 SEO　中最重要的配置
  title: 'Home page'
 },
 data() {
   return {
     isLoading: false,
     noMore: false
    //  articles: [
    //    {
    //      id: 1,
    //      content: '### Vue全家桶，Vue-router路由，Vuex状态管理器。Vue全家桶，Vue-router路由，Vuex状态管理器。Vue全家桶，Vue-router路由，Vuex状态管理器。Vue全家桶，Vue-router路由，Vuex状态管理器。'
    //    }
    //  ]
   }
 }
}
</script>

<style lang="scss">

</style>
