<template>
  <div class="other-comment">
    <div class="other-comment-head">
      全部评论
    </div>
    <div class="comment-show">
      <div class="comment-show-left">
        <img src="~assets/img/BlogDetail/comment-user.png"/>
      </div>
      <div class="comment-show-center">
        <div class="comment-show-user">小明</div>
        <div class="comment-show-content">
          你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊你好啊
        </div>
      </div>
      <div class="comment-show-right">
        <div class="comment-show-time">2021/02/06</div><!--
            <div class="comment-show-reply">回复</div>-->
      </div>
    </div>
  </div>
</template>

<script>

import TinymceEditor from "@/components/common/tinymceEditor/TinymceEditor";
import {addComment} from "@/network/blog";

export default {
  name: "ShowComment",
  components: {
    TinymceEditor
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .other-comment{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 2px 4px rgba(0,0,0,.035);
  }

  .other-comment-head {
    font-size: 20px;
    padding: 15px 10px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }

  .comment-show{
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }


  .comment-show div {
    align-items: center;
    vertical-align: middle;
  }

  .comment-show-left img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .comment-show-left {
    text-align: center;
    width: 10%;
    display: inline-block;
  }

  .comment-show-center {
    padding-left: 1em;
    width: 75%;
    display: inline-block;
  }

  .comment-show-right {
    text-align: center;
    width: 15%;
    display: inline-block;
  }

  .comment-show-user {
    font-size: 16px;
    font-weight: 700;
  }

  .comment-show-content {
    padding-top: 20px;
    font-size: 1rem;
    font-weight: 300;
  }

  .comment-show-time {
    font-size: 13px;
    font-weight: 400;
  }

  .comment-show-reply {
    padding-top: 20px;
  }
</style>
