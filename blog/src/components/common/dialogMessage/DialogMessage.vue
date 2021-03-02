<template>
  <div class="dialog">
    <!--外层的遮罩 点击事件用来关闭弹窗，isShow控制弹窗显示 隐藏的props-->
    <div class="dialog-cover back"  v-if="isShow"  @click="closeMyself"></div>
    <!-- transition 这里可以加一些简单的动画效果 -->
    <transition name="drop">
      <!--style 通过props 控制内容的样式  -->
      <div class="dialog-content" :style="{top:topDistance, width:widNum, left:leftSite}"  v-if="isShow">
        <div class="dialog_head back ">
          <!--弹窗头部 title-->
          <slot name="header">提示信息</slot>
        </div>
        <div class="dialog_main " :style="{paddingTop:pdt,paddingBottom:pdb}">
          <!--弹窗的内容-->
          <slot name="main">弹窗内容</slot>
        </div>
        <!--弹窗关闭按钮-->
        <div  class="foot_close" @click="closeMyself" v-if="dialogKind === 1">
          <div><img class="foot_img" src="~assets/img/dialogMessage/close1.png"/></div>
        </div>
        <!--选择按钮-->
        <div class="foot_close_choose" v-if="dialogKind === 2">
          <div  class="foot_close_left" @click="chooseYes">
            <div>确定</div>
          </div>
          <div  class="foot_close_right" @click="chooseNo">
            <div>关闭</div>
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
/** 弹窗组件*/
export default {
  name: "DialogMessage",
  props: {
    isShow: {
      type: Boolean,
      default: false,
      required: true
    },
    widNum: {
      type: String,
      default: '86.5%'
    },
    leftSite: {
      // 左定位
      type: String,
      default: '6.5%'
    },
    topDistance: {
      //top上边距
      type: String,
      default: '35%'
    },
    pdt: {
      //上padding
      type: String,
      default: '22px'
    },
    pdb: {
      //下padding
      type: String,
      default: '47px'
    },
    dialogKind: {
      //dialog类型 1弹窗只显示消息 2弹窗有选择按钮
      type: Number,
      default: 1
    }
  },
  methods: {
    closeMyself() {
      this.$emit("dialogClose");
    },
    chooseYes() {
      this.$emit("chooseYes");
    },
    chooseNo() {
      this.$emit("chooseNo");
    },
  }
};
</script>
<style   scoped>
  /** 弹窗动画*/
  .drop-enter-active {
    /* 动画进入过程：0.5s*/
    transition: all 0.5s ease;
  }

  .drop-leave-active {
    /*动画离开过程：0.5s*/
    transition: all 0.3s ease;
  }

  .drop-enter {
    /*动画之前的位置*/
    transform: translateY(-100px);
  }

  .drop-leave-active {
    /*动画之后的位置*/
    transform: translateY(-100px);
  }

  /*最外层 设置position定位*/
  .dialog {
    position: relative;
    color: #2e2c2d;
    font-size: 16px;
  }

  /*遮罩 设置背景层，z-index值要足够大确保能覆盖，高度 宽度设置满 做到全屏遮罩*/
  .dialog-cover {
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /*内容层 z-index要比遮罩大，否则会被遮盖，*/
  .dialog-content {
    position: fixed;
    top: 35%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 300;
  }

  .dialog_head {
    /*头部title的背景 居中圆角等属性。
    没有图片就把background-image注释掉*/
    background-color: #2c7c58;
    color: white;
    background-size: contain;
    width: 86.5%;
    height: 43px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .dialog_main {
    /*主体内容样式设置*/
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 86.5%;
    padding: 22px 0 47px 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .foot_close {
    width: 50px;
    height: 50px;
    align-items: center;
    vertical-align: middle;
    border-radius: 50%;
    background: #2c7c58;
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: -25px;
  }



  .foot_close_choose {
    width: 86.5%;
    height: 50px;
    align-items: center;/*
    background: #2c7c58;*/
    background: #fff;
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: -25px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    position: relative;
  }

  .foot_close_left {
    width: 25%;
    height: 40px;
    align-items: center;
    vertical-align: middle;
    border-radius: 10px;
    background: #2c7c58;
    display: flex;
    justify-content: center;
    align-content: center;
    position: absolute;
    left: 15%;
    color: white;
  }

  .foot_close_right {
    width: 25%;
    height: 40px;
    align-items: center;
    vertical-align: middle;
    border-radius: 10px;
    background: #2c7c58;
    display: flex;
    justify-content: center;
    align-content: center;
    position: absolute;
    right: 15%;
    color: white;
  }

  .foot_img {
    vertical-align: middle;
    width: 30px;
    height: 30px;
  }
</style>
