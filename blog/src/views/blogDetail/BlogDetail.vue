<template>
  <div class="blog-detail">
    <div class="top">
      <div class="link" @click="linkClick">博客</div>
      <div>&nbsp;&nbsp;>&nbsp;&nbsp;</div>
      <div>{{article.title}}</div>
    </div>
    <div class="article">
      <div class="title">{{article.title}}</div>
      <div class="author">{{article.author}}</div>
      <div class="content">{{article.content}}</div>
    </div>
    <div class="label">
      标签：<span class="label-item"
               v-for="item in article.label"
               :style="{'background-color': randomColor(item)}">{{item}}</span>
    </div>
    <br/><br/>
    <div class="comment">
      <!--<div class="other-comment">
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
            <div class="comment-show-time">2021/02/06</div>&lt;!&ndash;
            <div class="comment-show-reply">回复</div>&ndash;&gt;
          </div>
        </div>
      </div>-->
      <show-comment/>
      <write-comment/>
      <!--
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
                          :toolbar="toolbar"/>&lt;!&ndash;其他设置：:base-url="baseUrl" :language="language" :skin="skin"&ndash;&gt;
          <div class="comment-button">
            <span @click="send">发送</span>
            <span @click="clear">清空内容</span>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>

  import ShowComment from "@/components/content/showComment/ShowComment";

  import { mapGetters } from 'vuex'
  import {randomColorMixin} from "../../common/mixin";
  import {findArticle} from "../../network/home";
  import {addComment} from "@/network/blog";
  import WriteComment from "@/components/content/writeComment/WriteComment";

  export default {
    name: "BlogDetail",
    components: {
      WriteComment,
      ShowComment
    },
    mixins: [randomColorMixin],
    computed: {
      ...mapGetters(['articleId']),
    },
    data() {
      return {
        article: {
          type: Object,
          default: {}
        },
        disabled: false,
        plugins: '',
        toolbar: 'undo redo | bold italic forecolor backcolor'
      }
    },
    created() {

      //页面加载时,如果vuex中指定值为空则更新vuex
      if (sessionStorage.getItem("articleId") && this.articleId == null) {
        this.$store.dispatch('addCurrentArticle', sessionStorage.getItem("articleId"))
      }
      //页面刷新时，将vuex中指定值的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("articleId", "");
        sessionStorage.setItem("articleId", this.articleId);
      });

      /*//在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", "");
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });*/

      findArticle(this.articleId).then( data => {
        this.article = data[Object.keys(data)[0]]
        this.article['title'] = Object.keys(data)[0]
      })
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
          addComment(name, this.article.title, this.$refs.editor.getValue()).then(res => {

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

  .blog-detail {
    padding: 25px 10%;
    position:relative;
  }

  .blog-detail:before{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: '';
    background-image: url("~assets/img/BlogDetail/1111.jpg");
    opacity: .5;
    z-index: -1;
  }

  .top {
  }

  .top div{
    font-size: 20px;
    display: inline-block;
  }

  .link {
    color: #17BD9D;
    cursor:pointer
  }

  .article {
    padding-top: 40px;
    text-align: center;
    font-family: 楷体;
  }

  .title {
    font-size: 40px;
    padding: 10px 0;
  }

  .author {
    padding: 10px 0;
    font-size: 18px;
  }

  .content {
    padding: 10px 0;
    text-indent: 2em;/*缩进两个像素*/
    font-size: 22px;
    line-height: 2;
    text-align : justify;
  }

  .label {
    padding: 20px 0;
  }

  .label-item {
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 5px;/*
    background-color: red;*/
    color: white;
  }

  /*文章评论区*/

  /*.other-comment{
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
  }*/

  /*!*写评论*!
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
    padding: 5px 5px;
    background-color: #48AA71;
    box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  }

  .comment-button span:hover{
    background-color: #458F64;
    -webkit-transform:translateY(-1px);
    -moz-transform:translateY(-1px);
    -ms-transform:translateY(-1px);
    -o-transform:translateY(-1px);
    transform:translateY(-1px);
  }*/
</style>
