<template>
  <div class="blog">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="pullingUp"
            :pull-up-load="true">

      <div class="banner">
        <div>{{articleKind}}</div>
      </div>

      <div class="label-show">
        <p class="show-info">分类：</p>
        <span class="label"
              :class='{isActive: allShow === currentIndex}'
              @click="labelClick('all', -1)">全部</span>
        <span class="label"
              v-for="(item, index) in labelInfo"
              :class='{isActive: index === currentIndex}'
              :style="{'background-color': randomColor(item)}"
              @click="labelClick(item, index)">{{item}}</span>
      </div>

      <div class="article-list" id="content">
        <article-info :article-info="articleInfo" :label-info="labelInfo" @articleLoad="articleLoad"/>
      </div>
      <floor class="floor"/>
    </scroll>
    <back-top v-show="isShowBackTop"
              @click.native="backClick"/>
  </div>
</template>

<script>
import ArticleInfo from "../../components/content/articleInfo/ArticleInfo";

import {getArticleByLabel} from "../../network/blog";
import {articleListByKindMixin, checkLogin, randomColorMixin, scrollSet, showBackTop} from "../../common/mixin";


export default {
  name: "AdminBlog",
  mixins: [articleListByKindMixin, randomColorMixin, scrollSet, showBackTop, checkLogin],
  components: {
    ArticleInfo,
  },
  data() {
    return {
      allShow: -1,
      currentIndex: -1,
      currentKind: '散文诗集',
      labelKind: null
    }
  },
  methods: {
    labelClick(item, index) {
      this.page = 0;
      this.articleInfo = []
      this.currentIndex = index
      if(item === 'all') {
        this.labelKind = null
        getArticleByLabel(this.articleKind, null, this.page).then( res => {
          this.articleInfo.push(...res)
          this.page = this.page + 1
        })
      }else {
        this.labelKind = item
        getArticleByLabel(this.articleKind, item, this.page).then( res => {
          this.articleInfo.push(...res)
          this.page = this.page + 1
        })
      }
    },
    pullingUp() {

      getArticleByLabel(this.articleKind, this.labelKind, this.page).then( res => {
        if(res !== -1) {
          this.articleInfo.push(...res)
          this.page = this.page + 1
        }

        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>

@font-face
{
  font-family: showInfoFont;
  src: url('~assets/font/小熊冻冻奶.ttf'); /* IE9+ */
}

/* .blog {
   position: relative;
   height: 100vh;
   background-image: url('~assets/img/blog/花.jpg');
   background-size: 100%, cover;
 }*/

.blog:before{
  position: absolute;
  background-image: url('../../assets/img/blog/花.jpg');
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

.scroll {
  position: absolute;
  overflow: hidden;
  top: 65px;
  left: 0;
  right: 0;
  bottom: 0;
}

.banner {
  width: 100%;
  height: 300px;
  background-image: url('~assets/img/blog/小碎花壁纸背景.jpg') ,url('~assets/img/blog/小碎花壁纸背景.jpg');
  background-size: contain, contain;
  background-position: 0 80px, 0 0;
  background-repeat: repeat-x;
  display: table;
  overflow:hidden;
}

.banner div {
  color: black;
  text-align: center;
  font-size: 60px;
  display: table-cell;
  vertical-align: middle;
  font-family: myFirstFont;
  line-height: 70px;
}

.label-show {
  padding-top: 30px;
  padding-bottom: 5px;
  padding-left: 5%;
  padd-right: 5%;
  font-size: 18px;
  font-family: '楷体';
}

.show-info {
  display: inline-block;
  font-weight: bold;
  color: black;
}

.label {
  margin: 0 5px;
  padding: 2px 5px;
  border-radius: 5px;
  background-color: #2c7c58;
  color: white;
  opacity: 0.3;
}

.isActive {
  opacity: 1;
}

.article-list {
  margin: 10px 0;
  padding: 0 5%;
}
</style>
