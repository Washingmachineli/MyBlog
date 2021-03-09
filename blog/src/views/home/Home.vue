<template>
  <div class="home">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="pullingUp"
            :pull-up-load="true">
      <div class="banner">
        <beat-text class="text" :message="message" :setTime="parseInt('150')"/>
      </div>
      <div id="content" class="content-article">
        <article-info class="article-info" :article-info="articleInfo"  @articleLoad="articleLoad"/>
        <kind-show class="kind-show" :kind-info="kindInfo"/>
        <last-comment class="last-comment" :comment-info="lastComment"/>
      </div>
      <floor class="floor"/>
    </scroll>
    <back-top v-show="isShowBackTop"
              @click.native="backClick"/>
    <time-clock class="time-clock"/>
  </div>
</template>

<script>
  import BeatText from "../../components/common/beatText/BeatText";
  import ArticleInfo from "../../components/content/articleInfo/ArticleInfo";
  import KindShow from "../../components/content/kindShow/KindShow";
  import TimeClock from "@/components/common/tImeClock/TimeClock";
  import LastComment from "@/components/content/lastComment/LastComment";


  import {articleListMixin, scrollSet, showBackTop, checkLogin} from "../../common/mixin";
  import {getComment} from "@/network/blog";
  import {debounce} from "@/common/utils";
  import ScrollView from "@/components/common/scrollView/ScrollView";

  export default {
    name: "Home",
    mixins: [articleListMixin, scrollSet, showBackTop, checkLogin],
    components: {
      ScrollView,
      BeatText,
      ArticleInfo,
      KindShow,
      TimeClock,
      LastComment
    },
    data() {
      return {
        message: '既然我已经踏上这条道路，那么，任何东西都不应妨碍我沿着这条路走下去。',
        page: 0,
        lastComment: {},
      }
    },

    created() {

      getComment(null, this.page).then( res => {
        this.lastComment = res.data
      })

    },
    methods: {
      pullingUp() {
        const article = debounce(() => {
          this._getArticleInfo()
          this.$refs.scroll.finishPullUp()
        },500)
        article()
      },
      /*signout() {
        sessionStorage.removeItem('token');

        this.$store.dispatch('signOut')
      }*/
    },
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
    display: table;
    overflow:hidden;
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

  .kind-show {
    display: inline-block;
    position: absolute;
    top: 20px;
    right: 5%;
    width: 30%;
  }

  .last-comment {
    position: absolute;
    top: 420px;
    right: 5%;
    width: 30%;
  }

  .time-clock {
    position: fixed;
    bottom: 10px;
    left: 10px;
  }
</style>
