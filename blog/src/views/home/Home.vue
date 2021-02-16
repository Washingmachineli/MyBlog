<template>
  <div class="home">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true"
            @pullingUp="pullingUp"
            :pull-up-load="true">
      <div class="banner">
        <beat-text class="text" :message="message" :setTime="parseInt('150')"/>
      </div>
      <div id="content" class="content-article">
        <article-info class="article-info" :article-info="articleInfo" :label-info="labelInfo" @articleLoad="articleLoad"/>
        <label-show class="label-show" :label-info="labelInfo"/>
      </div>
      <floor class="floor"/>
    </scroll>

    <time-clock class="time-clock"/>
  </div>
</template>

<script>
  import BeatText from "../../components/common/beatText/BeatText";
  import ArticleInfo from "../../components/content/articleInfo/ArticleInfo";
  import LabelShow from "../../components/content/labelShow/LabelShow";
  import TimeClock from "@/components/common/tImeClock/TimeClock";


  import {articleListMixin, scrollSet, showBackTop} from "../../common/mixin";

  export default {
    name: "Home",
    mixins: [articleListMixin, scrollSet, showBackTop],
    components: {
      BeatText,
      ArticleInfo,
      LabelShow,
      TimeClock
    },
    data() {
      return {
        message: '既然我已经踏上这条道路，那么，任何东西都不应妨碍我沿着这条路走下去。',
      }
    },
    methods: {
      pullingUp() {
        this._getArticleInfo()
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

  .home{
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .scroll {
    overflow: hidden;
    position: absolute;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
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

  .content-article {
    width: 100%;
    height: 100%;
    position: relative;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 10%;
  }

  .article-info {
    margin: 20px 0;
    display: inline-block;
    width: 65%;
  }

  .label-show {
    display: inline-block;
    position: absolute;
    top: 20px;
    right: 10%;
    width: 25%;
  }
</style>
