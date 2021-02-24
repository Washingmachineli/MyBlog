<template>
  <div>
    <div class="other-content" v-if="kind === 'text'">
      <div class="other-img">
        <img :class="{showLeftActive: isActive}" v-lazy='otherImg' @load="imgLoad"/>
      </div>
      <div :class="{otherText: true, showRightActive: isActive}">
        <p class="before-name">{{beforeName}}</p><p class="other-name">{{otherName}}</p>
        <hr class="hr-style"/>
        <p class="talk" v-html="talk"></p>
      </div>
    </div>
    <div class="other-content" v-if="kind === 'music'">
      <div class="other-img">
        <img  :class="{showLeftActive: isActive}" v-lazy="otherImg" @load="imgLoad"/>
      </div>
      <div :class="{otherText: true, showRightActive: isActive}">
        <p class="before-name">{{beforeName}}</p><p class="other-name">{{otherName}}</p>

        <p class="otherTextButton"   @click="audioPlayOrPause">
          <img id="musicButton" v-lazy="buttonImg"
               class="musicButton"/>
        </p>
        <hr class="hr-style"/>
        <p class="talk" v-html="talk"></p>
      </div>
      <audio ref="audio" :src="musicSrc" loop preload="auto"></audio>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ShowCart",
    props: {
      kind: {
        type: String,
        default: 'text'
      },
      beforeName: {
        type: String,
        default: ''
      },
      otherName: {
        type: String,
        default: ''
      },
      talk: {
        type: String,
        default: ''
      },
      otherImg: {
        type: String,
        default: ''
      },
      startImg: {
        type: String,
        default: ''
      },
      stopImg: {
        type: String,
        default: ''
      },
      musicSrc: {
        type: String,
        default: ''
      },
      id: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        playFlag: false,
        clickMusicBtn: false,
        buttonImg: null,
        isActive: false,
      }
    },

    async mounted () {

      this.buttonImg = this.startImg

      if(this.id === 0) this.isActive = true


      /*this.audioAutoPlay()
      document.addEventListener("visibilitychange", (e) => { // 兼容ios微信手Q
        if (this.clickMusicBtn) { // 点击了关闭音乐按钮
          if (this.playFlag) {
            this.audioAutoPlay();
            this.playFlag = true;
          } else {
            this.audioPause();
            this.playFlag = false;
          }

          //text.innerHTML = e.hidden;
          if (e.hidden) {  // 网页被挂起
            this.audioAutoPlay();
            this.playFlag = true;
          } else { // 网页被呼起
            this.audioPause();
            this.playFlag = false;
          }
        } else { // 未点击关闭音乐按钮
          if (this.playFlag) {
            this.audioPause();
            this.playFlag = false;
          } else {
            this.audioAutoPlay();
            this.playFlag = true;
          }

          //text.innerHTML = e.hidden;
          if (e.hidden) {  // 网页被挂起
            this.audioPause();
            this.playFlag = false;
          } else { // 网页被呼起
            this.audioAutoPlay();
            this.playFlag = true;
          }
        }
      });*/
    },
    methods: {
      audioPlayOrPause() {
        this.clickMusicBtn = !this.clickMusicBtn;
        if (this.playFlag) {
          this.audioPause();
          this.playFlag = false;
        } else {
          this.audioAutoPlay();
          this.playFlag = true;
        }
      },
      audioPause() {
        this.buttonImg = this.startImg
        let audio = this.$refs.audio
        audio.pause();
        document.addEventListener("WeixinJSBridgeReady", function () {
          audio.pause();
        }, false);
      },
      audioAutoPlay() {
        this.buttonImg = this.stopImg
        let audio = this.$refs.audio
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
          audio.play();
        }, false);
      },
      imgLoad() {
        this.$emit('imgLoad', this.id)
      },
      startAction() {
        this.isActive = true
      },
    },
  }
</script>

<style scoped>

  @font-face
  {
    font-family: otherFont;
    src: url('~assets/font/小熊冻冻奶.ttf'); /* IE9+ */
  }

  @font-face
  {
    font-family: talkFont;
    src: url('~assets/font/人间便利店.ttf'); /* IE9+ */
  }

.other-content {
    width: 100%;
    height: 150px;
    display: table;
  }

  .other-content div{
    display: table-cell;
    vertical-align: middle;
  }

  .other-content .other-img{
    text-align: center;
  }

  .other-img {
    width: 50%;
  }

  .before-name, .other-name {
    font-size: 30px;
    padding: 10px 5px;
    display: inline-block;
  }

  .other-name {
    color: #00b894;
  }

  .talk {
    font-size: 24px;
    font-family: talkFont;
    padding: 20px 0;
  }

  .other-img img{
    margin: 20px 0;
    width: 420px;
    height: 270px;
    transform: translateX(-100px);
    opacity: 0;
  }


  .otherText {
    font-size: 25px;
    font-family: otherFont;
    line-height: 30px;
    transform: translateX(100px);
    opacity: 0;
  }

  .hr-style {
    margin-right: 15%;
  }

  .before-name, .other-name, .talk, .otherTextButton {
    display: inline-block;
    align-items: center;
    vertical-align: middle;
  }

  .musicButton {
    width: 30px;
    height: 30px;
  }


  .showLeftActive {
    animation-iteration-count:1;
    animation: showInLeft 2s forwards;
  }

  .showRightActive {
    animation-iteration-count:1;
    animation: showInRight 2s forwards;
  }

  @keyframes showInLeft
  {
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  @keyframes showInRight
  {
    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }
</style>
