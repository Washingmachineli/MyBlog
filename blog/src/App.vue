<template>
  <!--<div id="Loading" v-if="!isReady">
    <div class="loader-inner ball-beat">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  <div id="app" v-else>
    <nav-bar class="home-nav" :menu="menu" :link="link">
      <div class="title" slot="title"><i>Ela's Blog</i></div>
    </nav-bar>

    <router-view class="router-view"/>
  </div>-->
  <div id="app" :class="{appIsLoading: !isReady}">

    <nav-bar class="home-nav" :menu="menu" :link="link" v-if="!isLogin">
      <div class="title" slot="title"><i>Ela's Blog</i></div>
    </nav-bar>
    <nav-bar class="home-nav" :menu="adminMenu" :link="adminLink" v-else-if="isLogin"  :sign-out-button="isLogin" @dialogChooseYes="confirmSignOut">
      <div class="title" slot="title"><i>Ela's Blog</i></div>
    </nav-bar>
    <nav-bar class="home-nav" :menu="{}" :link="[]" v-else>
      <div class="title" slot="title"><i>Ela's Blog</i></div>
    </nav-bar>
    <div id="Loading" v-if="!isReady">
      <div class="loader-inner ball-beat">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else>
      <router-view class="router-view"/>
    </div>
  </div>
</template>
<script>
  import NavBar from "./components/common/navbar/NavBar";
  import Floor from "./components/common/floor/Floor";
  import Scroll from "@/components/common/scroll/Scroll";

  import {getArticleKind} from "./network/app";
  import { mapGetters } from 'vuex'

  export default {
    name: "App",
    components: {
      Scroll,
      Floor,
      NavBar
    },
    //刷新vue-router
    provide (){
      return {
        reload:this.reload,/*
        signIn: this.signIn,
        signOut: this.signOut,*/
      }
    },
    data() {
      return {
        isReady: false,
        menu: {
          '主页': [],
          '博客': [],
          '留言': [],
          '其他': [],
        },
        link: [
          '/home',
          '/blog',
          '/message',
          '/other'
        ],
        adminMenu: {
          '主页': [],
          '写博客': [],
          '博客': [],
          '留言': [],
          '其他': [],
        },
        adminLink: [
          '/home',
          '/writeBlog',
          '/blog',
          '/message',
          '/other'
        ],
        isRouterAlive:true,
      }
    },
    computed: {
      ...mapGetters(['isLogin']),
    },
    created() {
      getArticleKind().then( data => {
        this.menu['博客'].push(...data)
        this.adminMenu['博客'].push(...data)
      })

    },
    methods: {
      //给router提供刷新页面方法
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      },
      confirmSignOut() {
        sessionStorage.removeItem("token");
        this.$store.dispatch('clearToken')
        this.$store.dispatch('signOut')
        this.reload()
        this.$router.replace('/home')
      }
      /*signIn() {
        this.adminMenu = {
          '主页': [],
          '写博客': [],
          '博客': [],
          '留言': [],
          '其他': [],
        }
        this.adminLink = [
          '/home',
          '/writeBlog',
          '/blog',
          '/message',
          '/other'
        ]
        getArticleKind().then( data => {
          this.adminMenu['博客'].push(...data)
          this.isLogin = true
        })
      },
      signOut() {
        this.isLogin = false
      }*/
    },
    mounted() {
      this.isReady = true
    }
  }
</script>
<style>


  .appIsLoading {
    background-image: url('~assets/img/app/bgc.png');
  }

  #Loading {
    top:50%;
    left:50%;
    position: absolute;
    -webkit-transform: translateY(-50%)  translateX(-50%);
    transform: translateY(-50%)  translateX(-50%);
    z-index:100;
  }


  @-webkit-keyframes ball-beat {
    50% {
      opacity: 0.2;
      -webkit-transform: scale(0.75);
      transform: scale(0.75); }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  @keyframes ball-beat {
    50% {
      opacity: 0.2;
      -webkit-transform: scale(0.75);
      transform: scale(0.75);
    }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }

  .ball-beat > div {
    background-color: #279fcf;
    width: 15px;
    height: 15px;
    border-radius: 100% !important;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    display: inline-block;
    -webkit-animation: ball-beat 0.7s 0s infinite linear;
    animation: ball-beat 0.7s 0s infinite linear;
  }
  .ball-beat > div:nth-child(2n-1) {
    -webkit-animation-delay: 0.35s !important;
    animation-delay: 0.35s !important;
  }


  /*app*/
  @import "assets/css/base.css";
  html,body{
    height: 100%;
  }


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

  .router-view {

    background-image: url('~assets/img/home/浅绿.jpg');
  }

</style>
