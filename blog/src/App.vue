<template>
  <div id="app">
    <nav-bar class="home-nav" :menu="menu" :link="link">
      <div class="title" slot="title"><i>Ela's Blog</i></div>
    </nav-bar>

    <router-view class="router-view"/>
  </div>
</template>
<script>
  import NavBar from "./components/common/navbar/NavBar";
  import Floor from "./components/common/floor/Floor";

  import {getArticleKind} from "./network/app";
  import Scroll from "@/components/common/scroll/Scroll";

  export default {
    name: "App",
    components: {
      Scroll,
      Floor,
      NavBar
    },
    provide (){
      return {
        reload:this.reload
      }
    },
    data() {
      return {
        menu: {
          '主页': [],
          '博客': [],
          '留言': [],
          '关于': ['爱好', '摄影'],
        },
        link: [
          '/home',
          '/blog',
          '/message',
          '/about'
        ],
        isRouterAlive:true
      }
    },
    created() {
      getArticleKind().then( data => {
        this.menu['博客'].push(...data)
      })
    },
    methods: {
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      },
    }
  }
</script>
<style>
  @import "assets/css/base.css";
  html,body{height: 100%;}


  @font-face
  {
    font-family: appTitleFont;
    src: url('~assets/font/Reflisatta-2.ttf'); /* IE9+ */
  }

  #app {
    width: 100%;
    height: 100%;
    color: black;
  }

  #app::-webkit-scrollbar {
    display: none;
  }

/*
  .router-view {

    position: relative;
    top: 65px;
    left: 0;
    right: 0;
  }*/

  .title i {
    font-family: appTitleFont;
    color:black;
  }

  .time-clock {
    position: fixed;
    bottom: 10px;
    right: 10px;
  }

</style>
