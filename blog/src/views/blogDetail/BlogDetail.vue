<template>
  <div class="blog-detail">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div class="detail" v-if="!isOperation" ref="detail">
        <div class="top">
          <div class="link" @click="linkClick">{{ article.kind }}</div>
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
        <div class="article-operation" v-show="isLogin">
          <div class="article-modify" @click="articleModify()">编辑</div>
          <div class="article-delete" @click="articleDelete()">删除</div>
        </div>
        <br/><br/>
        <div class="comment">
          <show-comment v-if="article.title"
                        :is-admin="isLogin"
                        :article="article.title"
                        :key="keys"
                        id="showComment"
                        ref="showComment"/>
          <write-comment v-if="!isLogin"
                         :article="article.title"
                         :articleId="articleId"
                         @send="reloadDate"/>
        </div>
      </div>
      <modify-article v-else :article="article" @scrollTop="scrollTop"/>
      <floor class="floor"/>
    </scroll>

    <back-top v-show="isShowBackTop"
      @click.native="backClick"/>
  </div>
</template>

<script>

  import ShowComment from "@/components/content/showComment/ShowComment";
  import WriteComment from "@/components/content/writeComment/WriteComment";
  import TinymceEditor from "@/components/common/tinymceEditor/TinymceEditor";
  import ModifyArticle from "@/views/blogDetail/childrenComponent/modifyArticle";

  import { mapGetters } from 'vuex'
  import {randomColorMixin, showBackTop, scrollSet, checkLogin} from "../../common/mixin";
  import {findArticle} from "../../network/home";

  export default {
    name: "BlogDetail",
    inject: ['reload'],
    components: {
      ModifyArticle,
      TinymceEditor,
      ShowComment,
      WriteComment,
    },
    mixins: [randomColorMixin, showBackTop, scrollSet, checkLogin],
    computed: {
      ...mapGetters(['articleId']),
      ShowCommentHeight() {
        return document.getElementById('showComment')
      }
    },
    data() {
      return {
        article: {
          type: Object,
          default: {}
        },
        keys: 0,
        isOperation: false,
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

      findArticle(this.articleId).then( data => {
        this.article = data[Object.keys(data)[0]]
        this.article['title'] = Object.keys(data)[0]
      })

    },
    methods: {
      linkClick() {
        this.$router.replace('/blog')
      },
      reloadDate() {
        this.keys += 1
        this.backShowComment()
      },
      backShowComment(){
        let position = this.$refs.showComment.$el.offsetTop
        this.$refs.scroll.scrollTo(0, -position, 300)
      },
      articleModify() {
        this.isOperation = true
        this.scrollToTop()
      },
      articleDelete() {

      },
      scrollTop() {
        this.isOperation = false
        this.scrollToTop()
      }
    }
  }
</script>

<style scoped>

  .blog-detail {
    position: relative;
    height: 100vh;
    background-color: #fff;
    background-image: none;
  }

  .scroll {
    position: absolute;
    overflow: hidden;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .detail {
    padding: 25px 10%;
    position:relative;
  }

  .detail-modify {
    padding: 25px 20%;
    position:relative;
  }

  .detail:before, .detail-modify:before{
    position: absolute;
    background-image: url('../../assets/img/BlogDetail/几何元素背景.jpg');
    background-size:contain;/*
    background-image: url("~assets/img/BlogDetail/雪压梅花枝.png");*/
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: '';
    opacity: .2;
    z-index: -1;
  }

  /*.top {
    padding-top: 25px;
    padding-left: 10%;
    padding-right: 10%;
  }*/

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

  .article-operation {
    text-align: center;
  }

  .article-delete{
    display: inline-block;
    padding: 2px 5px;
    margin: 5px 15px;
    color: white;
    border-radius: 5px;
    line-height: 30px;
    background-color: #E72500;
  }

  .article-modify{
    display: inline-block;
    padding: 2px 5px;
    margin: 5px 15px;
    color: white;
    border-radius: 5px;
    line-height: 30px;
    background-color: #48AA71;
  }

</style>
