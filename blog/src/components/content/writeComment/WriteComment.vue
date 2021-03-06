<template>
  <div class="write-comment">
    <div class="write-comment-head">
      评论
    </div>
    <div class="write">
      <div class="writer">
        <div class="writer-info">
          <img src="~assets/img/BlogDetail/comment-user.png">
          <input class="write_name" placeholder="昵称" type="text"  value="" ref="commentator">
        </div>
      </div>
      <tinymce-editor ref="editor"
                      :disabled="disabled"
                      :height="200"
                      :plugins="plugins"
                      :toolbar="toolbar"/><!--其他设置：:base-url="baseUrl" :language="language" :skin="skin"-->
      <div class="comment-button">
        <span @click="send">发送</span>
        <span @click="clear">清空内容</span>
      </div>
    </div>
  </div>
</template>

<script>

import TinymceEditor from "@/components/common/tinymceEditor/TinymceEditor";
import {addComment} from "@/network/blog";

export default {
  name: "WriteComment",
  components: {
    TinymceEditor
  },
  props: {
    article: '',
    articleId: '',
  },
  data() {
    return {
      disabled: false,
      plugins: 'emoticons',
      toolbar: 'undo redo | bold italic forecolor backcolor emoticons'
    }
  },
  methods: {
    linkClick() {
      this.$router.replace('/blog')
    },

    // 鼠标单击的事件
    send() {
      let name = this.$refs.commentator.value
      if(name === '')
      {
        this.$toast.show('昵称不能为空！', 3000)
      }
      else {
        addComment(name, this.article, this.articleId, this.$refs.editor.getValue()).then( res => {
          this.$refs.editor.clear()
          this.$emit('send')
        })
      }

    },
    // 清空内容
    clear () {
      this.$refs.editor.clear()
    }
  }
}
</script>

<style scoped>
  /*写评论*/
  .write-comment {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 2px 4px rgba(0,0,0,.035);
  }

  .write-comment-head {
    font-size: 20px;
    padding: 15px 10px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }

  .write-comment {
    margin-top: 30px;
  }

  .write-comment-head {
    font-size: 20px;
    font-weight: bold;
  }


  .write {
    padding: 0 10px;
  }

  .writer {
    padding: 10px 0;
    height: 60px;
  }

  .writer-info {
    width: 40%;
    height: 40px;
    border: 1px solid #cad1d7;
    border-radius: 8px;
    align-items: center;
    vertical-align: middle;
    position: relative;
  }


  .writer-info img {
    position: absolute;
    top: 4px;
    left: 5px;
    bottom: 0;
    line-height: 40px;
    width: 30px;
    height: 30px;
    border-radius: 20px;
  }

  .writer input{
    position: absolute;
    top: 0;
    left: 18%;
    bottom: 0;
    line-height: 40px;
    display: inline-block;
    width: 80%;
    border: 0;
    outline:none;
    border-radius: 8px;
  }

  .comment-button {
    color: white;
    padding: 20px 0;
    height: 60px;
  }

  .comment-button span {
    float: right;
    margin-left: 10px;
    display: inline-block;
    padding: 5px 25px;
    background-color: #48AA71;
    box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  }

  .comment-button span:hover{
    background-color: #458F64;

    -webkit-transform:translateY(1px);
    -moz-transform:translateY(1px);
    -ms-transform:translateY(1px);
    -o-transform:translateY(1px);
    transform:translateY(1px);
  }

</style>
