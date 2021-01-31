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
    <div>
      标签：<span class="label"
               v-for="item in article.label"
               :style="{'background-color': randomColor(item)}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import {findArticle} from "../../network/home";
  import {randomColorMixin} from "../../common/mixin";

  export default {
    name: "BlogDetail",
    /*props: {
      articleInfo: null,
    },*/
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
      }
    }
  }
</script>

<style scoped>

  .blog-detail {
    padding: 0 10%;
  }

  .top {
    margin: 25px 0;
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
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 5px;/*
    background-color: red;*/
    color: white;
  }
</style>
