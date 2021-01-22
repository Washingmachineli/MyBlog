<template>
  <div class="nav-bar">
    <div class="title"><slot name="title"></slot></div>
    <div class="right">
      <div class="content">
        <span v-for="(item, index) in Object.keys(menu)"
              :key="index"
              :class="{isActive:(mouseActive && (currentMouseIndex === item)), isActive: (currentIndex === index)}"
              @mouseover="overShow(menu[item], item)"
              @click="itemClick(index)"
              @mouseout="overHidden(index)">
          {{item}}
          <nav-bar-item :small-title="menu[item]"
                        :titleIndex="index"
                        @titleIndex="titleIndex"
                        v-if="(itemIsShow || itemIsShowConfirm) && (currentMouseIndex === item)"
                        @mouseenter.native="overShowConfirm(item, index)"
                        @mouseleave.native="overHiddenConfirm"
                        :link="itemLink"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBarItem from "./NavBarItem";

  export default {
    name: "NavBar",
    props: {
      menu: {
        type: Object,
        default:{}
      },
      link: {
        type: Object,
        default:{}
      }
    },
    components: {
      NavBarItem
    },
    data() {
      return {
        itemIsShow: false,
        itemIsShowConfirm: false,
        currentMouseIndex: null,
        mouseActive: false,
        itemLink: [],
        currentIndex: 0,
      }
    },
    methods: {

      //鼠标移动上去显示
      overShow(value, item) {
        this.mouseActive = true
        this.currentMouseIndex = item
        if(Object.keys(value).length !== 0) {
          this.mouseActive = false
          this.itemIsShow = true
        }
      },
      //鼠标离开隐藏
      overHidden() {
        this.mouseActive = false

        if(this.itemIsShow) {

          setTimeout(() => {
            this.itemIsShow = false
          }, 10)
        }
      },
      //二次确认是否要显示
      overShowConfirm(item, index) {
        this.itemIsShowConfirm = true
        this.itemLink = this.link[Object.keys(this.link)[index]];
      },
      //二次确认是否隐藏
      overHiddenConfirm() {
        setTimeout(() => {
          this.itemIsShowConfirm = false
        }, 10)
      },
      itemClick(index) {
        //点击变色
        this.currentIndex = index;
        //跳转
        const path = Object.keys(this.link)[index]
        if(this.$route.path !== path) {
          //catch(err=>err)防止多次点击同一路由地址产生报错
          this.$router.replace(path).catch(err=>err);
        }
      },
      titleIndex(index) {
        this.currentIndex = index
        this.itemIsShow = false
        this.itemIsShowConfirm = false

      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    line-height: 40px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    vertical-align: middle;
    padding: 10px 0;
    display: flex;
    z-index: 5;
    background-color: #fff;
    opacity: .9;
  }

  .title {
    font-size: 30px;
    margin-left: 30px;
    color: #2c3e50;
  }

  .right {
    position: absolute;
    right: 25px;
  }

  .content {
    height: 100%;
    z-index: 10;
  }

  .content span{
    display: inline-block;
    margin: 0 10px;
    font-size: 20px;
    height: 100%;
    color: #2c3e50;
  }

  .isActive {
    border-bottom: 2px solid #46bd87;
  }

  .clickActive {
    color: #46bd87!important;
  }
</style>
