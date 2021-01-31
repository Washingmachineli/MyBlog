<template>
  <div class="nav-bar">
    <div class="title"><slot name="title"></slot></div>
    <div class="right">
      <div class="content">
        <span v-for="(item, index) in Object.keys(menu)"
              :key="index"
              :class="{isActive:(mouseActive && (currentMouseIndex === item)), isActive: (currentIndex === index)}"
              @click="itemClick(item, index)">
          {{item}}
          <nav-bar-item :small-title="menu[item]"
                        v-show="isShow && currentIndex === index"
                        @labelClick="labelClick"
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
        type: Array,
        default: []
      }
    },
    components: {
      NavBarItem
    },
    data() {
      return {
        currentMouseIndex: null,
        mouseActive: false,
        currentIndex: 0,
        isShow:false,
      }
    },
    mounted() {
      let _this = this;
      setTimeout(function() {
        _this.currentIndex = _this.link.findIndex(index => index == _this.$route.path)
      }, 500);
    },
    computed: {
      itemLink() {
        return this.link[this.currentIndex]
      }
    },
    methods: {
      itemClick(item, index) {
        //点击变色
        this.currentIndex = index;
        if(Object.keys(this.menu[item]).length !== 0) {
          this.isShow = !this.isShow
        }
        else{
          //跳转
          this.isShow = false
          const path = this.link[index]
          if(this.$route.path !== path) {
            //catch(err=>err)防止多次点击同一路由地址产生报错
            this.$router.replace(path).catch(err=>err);
          }
        }
      },
      labelClick() {
        this.isShow = false
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
    box-shadow: 2px 0 2px #888888;
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
