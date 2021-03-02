<template>
  <div class="nav-bar">
    <div class="title"><slot name="title"></slot></div>
    <div class="right">
      <div class="content">
        <span v-for="(item, index) in Object.keys(menu)"
              :key="index"
              :class="{isActive: (currentIndex === index), contentSpan: true}"
              @click="itemClick(item, index)">
          {{item}}
          <nav-bar-item :small-title="menu[item]"
                        v-show="isShow && currentShow === index"
                        @kindClick="kindClick"
                        :link="itemLink"
                        :index="index"/>
        </span>
        <span class="signOut" v-if="signOutButton">
          <img src="~assets/img/common/signOut1.png"
                                   @click="signOut">
        </span>
      </div>
    </div>
    <dialog-message :is-show="dialogShow"
                    wid-num="30%"
                    left-site="35%"
                    :dialog-kind="2"
                    @dialogClose="dialogClose"
                    @chooseYes="chooseYes"
                    @chooseNo="chooseNo">
      <div slot="header">提醒</div>
      <div slot="main">确认退出该账户吗？</div>
    </dialog-message>
  </div>
</template>

<script>
  import NavBarItem from "./NavBarItem";
  import DialogMessage from "@/components/common/dialogMessage/DialogMessage";

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
      },
      signOutButton: {
        type: Boolean,
        default: false
      }
    },
    components: {
      DialogMessage,
      NavBarItem
    },
    data() {
      return {
        currentIndex: -1,
        currentShow: 0,
        isShow: false,
        dialogShow: false
      }
    },
    created() {
      this.$bus.$on('viewLoad', this.refreshLink)


      /*let _this = this;
      alert(_this.link.findIndex(index => index == _this.$route.path))
      setTimeout(function() {
        _this.currentIndex = _this.link.findIndex(index => index == _this.$route.path)
      }, 500);*/
    },
    computed: {
      itemLink() {
        return this.link[this.currentShow]
      }
    },
    methods: {
      itemClick(item, index) {
        //点击变色
        this.currentShow = index;
        if(Object.keys(this.menu[item]).length !== 0) {
          this.isShow = !this.isShow
        }
        else{
          //跳转
          this.currentIndex = index
          this.isShow = false
          const path = this.link[index]
          if(this.$route.path !== path) {
            //catch(err=>err)防止多次点击同一路由地址产生报错
            this.$router.replace(path).catch(err=>err);
          }
        }
      },
      kindClick(index) {
        this.isShow = false
        this.currentIndex = index
      },
      //判断当前是在哪个页面
      refreshLink() {
        let _this = this;
        this.$router.onReady(() => {
          this.currentIndex = _this.link.findIndex(index => index == _this.$route.path)
          if(_this.$route.path === '/blogDetail') this.currentIndex = this.link.indexOf('/blog')
          /*console.log(this.islogin)
          console.log(this.link.indexOf('/blog'))*/
        });
      },
      signOut() {
        this.dialogShow = true
      },
      dialogClose() {
        this.dialogShow = false
      },
      chooseYes() {
        this.dialogShow = false
        this.$emit('dialogChooseYes')
      },
      chooseNo() {
        this.dialogShow = false
      },
    },
    watch: {
      link() {
        this.refreshLink()
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
    opacity: 1;
    box-shadow: 2px 0 2px #888888;


  }

  .nav-bar:after{
    position: absolute;
    background-image: url('~assets/img/home/浅绿.jpg');
    background-position: 0 0; /*
    background-image: url("~assets/img/BlogDetail/雪压梅花枝.png");*/
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: '';
    opacity: .6;
    z-index: -1;
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

  .contentSpan{
    display: inline-block;
    margin: 0 10px;
    font-size: 20px;
    height: 100%;
    color: #2c3e50;
  }

  .isActive {
    font-weight: bold;
    border-bottom: 4px solid #46bd87;
  }

  .clickActive {
    color: #46bd87!important;
  }

  .signOut {
    display: inline-block;
    margin: 0 10px;
    height: 45px;
    align-items: center;
    vertical-align: middle;
  }

  .signOut img{
    vertical-align: middle;
    width: 30px;
    height: 30px;
    border-radius: 20px;
  }
</style>
