<template>
  <div class="components-container">
      <code>Markdown is based on
          <a href="https://github.com/sparksuite/simplemde-markdown-editor" target="_blank">simplemde-markdow-editor</a>
          ,Simply encapsulated in Vue.
          <a href="https://segmentfault.com/a/1190000009762198#articleHeader14" target="_blank">相关文章</a>
      </code>
      <div class="editor-container">
          <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :zIndex="20">

          </markdown-editor>
      </div>
      <el-button @click="markdown2Html" style="margin-top:80px;" type="primary" icon="el-icon-document">To HTML</el-button>
      <div v-html="html"></div>
  </div>
</template>

<script>
import markdownEditor from '@/components/markdownEditor'

const content = `
**this is test**

* vue
* element
* webpack

##Simplemde
`
export default {
  name: 'markdown',
  data () {
    return {
      content: content,
      html: ''
    }
  },
  components: {
    'markdown-editor': markdownEditor
  },
  methods: {
      markdown2Html() {
          import('showdown').then(showdown => {
              const converter = new showdown.Converter()
              this.html = converter.makeHtml(this.content)
          })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
