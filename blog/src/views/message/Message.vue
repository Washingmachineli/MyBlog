<template>
  <div class="message">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div class="banner">
        <div>留言板</div>
      </div>
      <div class="message-content">
        <show-comment :article="title"
                      :key="keys"
                      id="showComment"
                      ref="showComment"
                      :is-admin="isLogin"
                      @scrollCenter="scrollCenter"/>
        <write-comment v-if="!isLogin"
                       :article="title"
                       @send="reloadDate"/>
      </div>

      <floor class="floor"/>
    </scroll>
    <back-top v-show="isShowBackTop"
              @click.native="backClick"/>
  </div>
</template>

<script>

import {checkLogin, scrollSet, showBackTop} from "@/common/mixin";
  import ShowComment from "@/components/content/showComment/ShowComment";
  import WriteComment from "@/components/content/writeComment/WriteComment";

  export default {
    name: "Message",
    components: {
      WriteComment,
      ShowComment
    },
    mixins: [scrollSet, showBackTop, checkLogin],
    data() {
      return {
        title: '留言板',
        keys: 0,
      }
    },
    methods: {
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

  @font-face
  {
    font-family: messageFont;
    src: url('~assets/font/月下独酌.ttf'); /* IE9+ */
  }

  .message {
    position: relative;
    height: 100vh;
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

  .banner {
    width: 100%;
    height: 300px;
    background-image: url('~assets/img/message/纸飞机.png'),
                      url('~assets/img/message/banner3.jpg');
    background-position:80% center,center center;

    background-size: 25%, 100%, cover;
    background-repeat: no-repeat;
    display: table;
    overflow:hidden;
  }

  .banner div {
    color: black;
    text-align: center;
    font-size: 60px;
    display: table-cell;
    vertical-align: middle;
    font-family: messageFont;
    line-height: 70px;
  }

  .message-content {
    padding: 10px 5%;
    background-image: url('~assets/img/message/中国风背景.png');
    background-size: contain;
  }
</style>
