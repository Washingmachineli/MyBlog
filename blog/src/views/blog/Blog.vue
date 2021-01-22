<template>
  <div>
    <div class="label-show">
      <p class="show-info">分类：</p>
      <span class="label"
            :class='{isActive: allShow === currentIndex}'
            @click="labelClick(-1)">全部</span>
      <span class="label"
            v-for="(item, index) in Object.keys(labelInfo)"
            :class='{isActive: index === currentIndex}'
            :style="{'color': labelInfo[item].color,'background-color': labelInfo[item].backgroundColor}"
            @click="labelClick(index)">{{item}}</span>
    </div>

    <div class="article-list" id="content">
      <article-info :article-info="articleInfo" :label-info="labelInfo" @articleLoad="articleLoad"/>
    </div>
  </div>
</template>

<script>
  import ArticleInfo from "../../components/content/articleInfo/ArticleInfo";
  import {articleListMixin} from "../../common/mixin";
  export default {
    name: "Blog",
    mixins: [articleListMixin],
    components: {
      ArticleInfo
    },
    data() {
      return {
        allShow: -1,
        currentIndex: -1
      }
    },
    methods: {
      labelClick(index) {
        this.currentIndex = index
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


  .label-show {
    margin-top: 20px;
    padding: 5px 6%;
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
    margin: 10px 5%;
  }
</style>
