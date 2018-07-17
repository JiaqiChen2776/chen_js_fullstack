<template>
<form class="input-area">
    <label for="">用户名：</label>
    <input type="text" class="user" ref="username" placeholder="请输入用户名">
    <label for="">评论：</label>
    <textarea type="text" class="textarea" ref="content" placeholder="请输入评论内容" @keyup.enter.prevent="doComment"></textarea>
    <button type="button" @click="doComment">提交</button>
</form>
</template>
<script>
export default {
    methods: {
        doComment() {
            const user = this.$refs.username.value;
            const content = this.$refs.content.value;
            const pubTime = new Date().toLocaleString();
            this.$emit('addComment', `${user}:${content},发布于${pubTime}`);
            this.$refs.content.value = '';    // 提交评论后清空
        }
    }
}
</script>
<style>
.input-area {
  color: #000;
  font-size: 15px;
  margin: 10px auto;
  width: 300px;
}
.input-area .user {
  border: 1px solid blue;
  width: 100px;
  display: block;
  margin-bottom: 10px;
}
.input-area .textarea {
  border: 1px solid blue;
  width: 100px;
  height: 100px;
  display: block;
  margin-bottom: 10px;
}

</style>
