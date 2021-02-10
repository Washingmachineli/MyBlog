<template>
  <div class="blog">
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
  </div>
</template>

<script>
  import ArticleInfo from "../../components/content/articleInfo/ArticleInfo";

  import {getArticleByLabel} from "../../network/blog";
  import {articleListByKindMixin, randomColorMixin} from "../../common/mixin";

  export default {
    name: "Blog",
    mixins: [articleListByKindMixin, randomColorMixin],
    components: {
      ArticleInfo,
    },
    data() {
      return {
        allShow: -1,
        currentIndex: -1,
        currentKind: '散文诗集',
      }
    },
    methods: {
      labelClick(item, index) {
        this.currentIndex = index
        if(item === 'all') {
          getArticleByLabel(this.articleKind, null).then( res => {
            this.articleInfo = res
          })
        }else {
          getArticleByLabel(this.articleKind, item).then( res => {
            this.articleInfo = res
          })
        }
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

  .blog {
    padding: 1% 10%;

  }

  .label-show {
    margin-top: 20px;
    padding: 5px 0;
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
  }
</style>
