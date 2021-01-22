<template>
  <div class="home">
    <div class="banner">
      <beat-text class="text" :message="message" :setTime="parseInt('150')"/>
    </div>
    <div id="content">
      <article-info class="article-info" :article-info="articleInfo" :label-info="labelInfo" @articleLoad="articleLoad"/>
      <label-show class="label-show" :label-info="labelInfo"/>
    </div>
  </div>
</template>

<script>
  import BeatText from "../../components/common/beatText/BeatText";
  import ArticleInfo from "../../components/content/articleInfo/ArticleInfo";
  import LabelShow from "../../components/content/labelShow/LabelShow";

  import {getArticleInfo, getLabelInfo} from "../../network/home";

  export default {
    name: "Home",
    components: {
      LabelShow,
      ArticleInfo,
      BeatText
    },
    data() {
      return {
        message: '既然我已经踏上这条道路，那么，任何东西都不应妨碍我沿着这条路走下去。',
        articleInfo: [],
        labelInfo: {},
      }
    },
    created() {
      this._getLabelInfo()
    },
    methods: {
      //获取所有文章信息,取消异步，同步执行
      async _getArticleInfo() {
        await getArticleInfo().then(data => {
          this.articleInfo = data
        })
      },
      //获取所有标签样式
      async _getLabelInfo() {
        await getLabelInfo().then(data => {
          this.labelInfo = data
          this._getArticleInfo()
        })
      },

      //填充父组件高度
      articleLoad(height){
        let content = document.getElementById('content')
        content.style.height = height;
        console.log(content.style.height);
      }
    }
  }
</script>

<style scoped>

  @font-face
  {
    font-family: myFirstFont;
    src: url('~assets/font/月下独酌.ttf'); /* IE9+ */
  }



  .banner {
    width: 100%;
    height: 300px;
    background-image: url('~assets/img/home/banner1.jpg') ;
    background-size: cover;
    background-repeat: no-repeat;
    display: table;overflow:hidden;
  }

  .banner .text {
    color: black;
    text-align: center;
    font-size: 40px;
    display: table-cell;
    vertical-align: middle;
    font-family: myFirstFont;
    line-height: 70px;
  }

  .content {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .article-info {
    position: absolute;
    left: 8%;
    width: 55%;
  }

  .label-show {
    position: absolute;
    right: 2%;
    width: 30%;
  }
</style>
