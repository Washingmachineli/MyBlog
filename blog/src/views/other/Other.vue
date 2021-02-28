<template>
  <div class="other">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div class="banner">
        <div class="banner-content">
          <img src="~assets/img/other/myLogo.jpg"/>
          <div class="name">我是ela</div>
          <div>一个努力的菜鸟程序媛</div>
        </div>
      </div>
      <!--<div class="other-content">
        <div class="other-img">
          <img src="~assets/img/other/毛不易.jpg"/>
        </div>
        <div>
          <div class="other-text">
            <p class="before-name">喜欢的歌手</p><p class="other-name">毛不易</p>
            <hr/>
            <p class="talk">喜欢他独特的嗓音，喜欢他写的旋律，喜欢他写的词</p>
          </div>
        </div>
      </div>
      <div class="other-content">
        <div class="other-img">
          <img src="~assets/img/other/深夜一角.jpg"/>
        </div>
        <div>
          <div class="other-text">
            <p class="before-name">喜欢的歌</p><p class="other-name">《深夜一角》</p>

            <span  @click="audioPlayOrPause"><img id="musicButton" class="musicButtonStart1" width="50px" height="50px"/></span>
            <hr/>
            <p class="talk">憧憬是碎了满地凉凉的宝石<br/>生活是一场大雨留下的潮湿<br/>祈祷在下个风和日丽的日子<br/>故事才刚刚开始</p>
          </div>
        </div>
      </div>
      <audio ref="audio" src="~assets/music/毛不易 - 深夜一角.mp3" autoplay loop preload="auto"></audio>
      -->
      <show-cart kind="text"
                 beforeName="喜欢的歌手"
                 otherName="毛不易"
                 talk="喜欢他写的词<br/>喜欢他写的旋律<br/>喜欢他独特的嗓音"
                 :otherImg="require('@/assets/img/other/毛不易.jpg')"
                 :id="0"
                 ref="0"
                 @imgLoad="showCartSet"/>
      <show-cart kind="music"
                 beforeName="喜欢的歌"
                 otherName="《深夜一角》"
                 talk="憧憬是碎了满地凉凉的宝石<br/>生活是一场大雨留下的潮湿<br/>祈祷在下个风和日丽的日子<br/>故事才刚刚开始"
                 :otherImg="require('@/assets/img/other/深夜一角.jpg')"
                 :start-img="require('@/assets/img/other/start.png')"
                 :stop-img="require('@/assets/img/other/stop.png')"
                 :music-src="require('@/assets/music/毛不易 - 深夜一角.mp3')"
                 :id="1"
                 ref="1"
                 @imgLoad="showCartSet"/>
      <show-cart kind="music"
                 beforeName="喜欢的歌"
                 otherName="《无问》"
                 talk="一生太短 一瞬好长<br/>我们哭着醒来 又哭着遗忘<br/>幸好啊 你的手曾落在我肩膀<br/>就像空中漂浮的<br/>渺小的 某颗尘土"
                 :otherImg="require('@/assets/img/other/无问.jpg')"
                 :start-img="require('@/assets/img/other/start.png')"
                 :stop-img="require('@/assets/img/other/stop.png')"
                 :music-src="require('@/assets/music/毛不易 - 无问.mp3')"
                 :id="2"
                 ref="2"
                 @imgLoad="showCartSet"/>
      <show-cart kind="text"
                 beforeName="喜欢的动物"
                 otherName="猫"
                 talk="小猫咪这么可爱谁不喜欢呢<br/><br/>＼( ^▽^ )／"
                 :otherImg="require('@/assets/img/other/猫.jpg')"
                 :id="3"
                 ref="3"
                 @imgLoad="showCartSet"/>
      <show-cart kind="text"
                 beforeName="喜欢的食物"
                 otherName="一切美食"
                 talk="美食真的是治愈神器<br/><br/>没有什么不开心的事情是一顿美食解决不了的<br/><br/>如果有的话，那就再吃一顿 (๑•̀ㅂ•́)و✧"
                 :otherImg="require('@/assets/img/other/美食.jpg')"
                 :id="4"
                 ref="4"
                 @imgLoad="showCartSet"/>
      <div class="last-word">
        <div class="word-title">最后</div>
        <div class="word">
          很高兴你能点开这个博客，并看到了最后。乁( ˙ ω˙乁)<br/>
          假如这个博客能帮到你，那真是太好了。٩( ´︶` )( ´︶` )۶<br/>
          这个博客还有很多不足的地方，如果你有什么建议或者想对我说的话，那么请在<span class="message" @click="toMessage">留言板</span>给我留言吧！<br/>
          若博客内容有涉及版权问题、站内错误、页面bug也请留言在<span class="message" @click="toMessage">留言板</span>，我会尽快处理的( >﹏<。)<br/>
          不忘初心，不负韶华。
        </div>
      </div>
      <floor class="floor"/>
    </scroll>
  </div>
</template>

<script>

  import ShowCart from "@/components/common/showCart/ShowCart";

  import {checkLogin, scrollSet} from "@/common/mixin";
  /*import {musicSet} from "@/common/mixin";*/

  export default {
    name: "Other",
    components: {
      ShowCart
    },
    mixins: [scrollSet, checkLogin],
    data() {
      return {
        showCartHeight: []
      }
    },
    methods: {
      showCartSet(id) {
        this.showCartHeight[id] = (this.$refs[id].$el.offsetTop - 350)
      },
      contentScroll(position){
        //判断是否显示backTop
        this.isShowBackTop = (-position.y) > 1000
        //判断tabControl是否要有吸顶效果
        this.isTabFixed = (-position.y) > this.tabOffsetTop

        this.checkAction(position)

      },
      checkAction(position) {
        let i = 0
        while (this.showCartHeight[i]) {
          if((-position.y) >= this.showCartHeight[i]) {
            this.$refs[i].startAction()
          }
          i++
        }
      },
      toMessage() {
        this.$router.replace('/message').catch(err=>err);
      }
    }
  }
</script>

<style scoped>

  @font-face
  {
    font-family: otherBannerFont;
    src: url('~assets/font/月下独酌.ttf'); /* IE9+ */
  }

  @font-face
  {
    font-family: otherFont;
    src: url('~assets/font/小熊冻冻奶.ttf'); /* IE9+ */
  }

  .other {
    position: relative;
    height: 100vh;
    background-image: none;/*
    background-image: url('~assets/img/other/云.jpg');
    background-size: 100%, cover;
    background-repeat: no-repeat;*/
  }

  .other:before{
    position: absolute;
    background-image: url('~assets/img/home/浅绿.jpg');
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: '';
    opacity: .4;
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
    background-image: url('~assets/img/other/花花.png');
    background-size: 100%,cover;
    background-position: 50% 0;
    display: table;
    overflow:hidden;
  }

  .banner div {
    color: black;
    text-align: center;
    font-size: 60px;
    display: table-cell;
    vertical-align: middle;
    font-family: otherBannerFont;
    line-height: 70px;
  }

  .banner-content img {
    width: 150px;
    height: 150px;
    border-radius: 75px;
  }

  .banner-content div {
    line-height: 35px;
    display: block;
    font-size: 25px;
  }

  .last-word {
    padding:20px 5%;
  }

  .word-title {
    font-size: 30px;
    padding: 10px 0;
    border-bottom: 1px solid #888;
    font-family: otherFont;
  }

  .word {
    padding: 10px 0;
    font-size: 22px;
    line-height: 40px;
    color: rgba(0,0,0,.8);
    font-family: otherFont;
  }

  .message {
    cursor: pointer;
    color: #33a57a;
  }

  .message:hover{
    text-decoration: underline;
  }
</style>
