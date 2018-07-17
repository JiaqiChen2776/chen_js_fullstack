<template>
  <div class="simplemde-container" :style="{heigth:heigth+'px',zIndex:zIndex}">
    <textarea :id="id"></textarea>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'
export default {
  name: 'markdownEditor',
  props: {
      value: String,
      id: {
          type: String
      },
      autofocus: {
          type: Boolean,
          default: false
      },
      placeholder: {
          type: String,
          default: ''
      },
      height: {
          type: Number,
          default: 150
      },
      zIndex: {
          type: Number,
          default: 10
      },
      toolbar: {
          type: Array
      }
  },
  watch: {
      value(val) {
          if (val === this.simplemde.value() && !this.hasChange) return
          this.simplemde.value(val)
      }
  },
  mounted() {
      this.simplemde = new SimpleMDE({
        //   element 默认为页面中的第一个 textarea
          element: document.getElementById(this.id || 'markdown-editor-'+ + new Date()),
        //   自动下载 font-awesome，此项目已安装引入，不需下载
          autoDownloadFontAwesome: false,
        //   autofocus 是否使editor自动获取焦点
          autofocus: this.autofocus,
        //   toolbar 是否启用工具栏按钮tips提示效果，默认值true
          toolbar: this.toolbar,
        //   拼写检查
          spellChecker: false,
        //   设置插入的内容，值为一个包含两个元素的数组，
        //   第一个元素将是在光标或高亮之前插入的文本，第二个元素将插入到后面
          insertTexts: {
              link: ['[',']()']
          },
        //   placeholder editor的占位内容
          placeholder: this.placeholder
      })
      if (this.value) {
          this.simplemde.value(this.value)
      }
      this.simplemde.codemirror.on('change', () => {
          if (this.hasChange) {
              this.hasChange = true
          }
          this.$emit('input',this.simplemde.value())
      })
    },
    destroyed() {
        this.simplemde.toTextArea()
        this.simplemde = null
    },
    data () {
        return {
        simplemde:null,
        hasChange: false
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.simplemde-container>>>.CodeMirror {
  min-height: 150px;
  line-height: 20px;
}
.simplemde-container>>>.CodeMirror-scroll {
  min-height: 150px;
}
.simplemde-container>>>.CodeMirror-code {
  padding-bottom: 40px;
}
.simplemde-container>>>.editor-statusbar {
  display: none;
}
.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-link {
  color: #1890ff;
}
.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-string.cm-url {
  color: #2d3b4d;
}
.simplemde-container>>>.CodeMirror .CodeMirror-code .cm-formatting-link-string.cm-url {
  padding: 0 2px;
  color: #E61E1E;
}
.simplemde-container >>> .editor-toolbar.fullscreen,
.simplemde-container >>> .CodeMirror-fullscreen {
  z-index: 1003;
}
</style>
