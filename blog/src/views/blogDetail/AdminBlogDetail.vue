<template>
  <div class="blog-detail">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div class="detail" ref="detail">
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
        <div class="comment">
          <show-comment v-if="article.title"
                        :article="article.title"
                        :key="keys"
                        id="showComment"
                        ref="showComment"/>
          <write-comment v-if="article.title"
                         :article="article.title"
                         :articleId="articleId"
                         @send="reloadDate"/>
        </div>
      </div>
      <floor class="floor"/>
    </scroll>

    <back-top v-show="isShowBackTop"
              @click.native="backClick"/>
  </div>
</template>

<script>

import ShowComment from "@/components/content/showComment/ShowComment";
import WriteComment from "@/components/content/writeComment/WriteComment";

import { mapGetters } from 'vuex'
import {randomColorMixin, showBackTop, scrollSet, checkLogin} from "../../common/mixin";
import {findArticle} from "../../network/home";

export default {
  name: "AdminBlogDetail",
  inject: ['reload'],
  components: {
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
      disabled: false,
      plugins: '',
      toolbar: 'undo redo | bold italic forecolor backcolor',
      keys: 0
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
    reloadDate() {
      this.keys += 1
      this.backShowComment()
    },
    backShowComment(){
      let position = this.$refs.showComment.$el.offsetTop
      this.$refs.scroll.scrollTo(0, -position, 300)
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

.detail:before{
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



</style>
