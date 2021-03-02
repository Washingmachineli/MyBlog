<template>
  <div class="nav-bar-item">
    <div class="ran"></div>
    <ul class="content">
      <li :class="{mouseOver:(currentMouse === item), isActive:(currentIndex === index) && (currentPath === link)}"
          v-for="(item, index) in smallTitle"
          :key="index"
          @click.stop="itemClick(item, index)">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "NavBarItem",
    props: {
      smallTitle: {
        type: Array,
        default: []
      },
      link: {
        type: String,
        default: null
      },
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        currentMouse: null,
        currentIndex: null,
      }
    },
    computed: {
      //当前路由
      currentPath() {
        return this.$route.path
      }
    },
    methods: {
      //显示
      overShow(item) {
        this.currentMouse = item;
      },
      //隐藏
      overHidden() {
        this.currentMouse = null;
      },
      itemClick(item, index) {
        //点击后，下拉窗消失
        this.$emit("kindClick", this.index)
        this.currentIndex = index

        //将选中的分类存到store
        this.$store.dispatch('changeArticleKind', item)


        //发送已经文章分类已经更改
        this.$bus.$emit('articleKindChanged')


        //跳转
        const path = this.link
        //catch(err=>err)防止多次点击同一路由地址产生报错



        this.$router.replace(path).catch(err=>err);
        /*
        if(this.$route.path !== path) {
          this.$router.replace(path)
        }*/
      },
    }
  }
</script>

<style scoped>
  .nav-bar-item {
    display: inline-block;
    position: absolute;
    z-index: 6;
  }
  .ran{
    position: absolute;
    left: -30px;
    top: 26px;
    width: 10px;
    height: 10px;
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    border-width: 8px;
    border-style: dashed dashed solid dashed;
    border-color: transparent transparent #ddd transparent;
  }

  .content {
    position: absolute;
    top: 40px;
    left: -75px;
    width: 110px;
    background-color: #fff;
    text-align: center;
    font-size: 17px;
    border:2px solid #ddd;
    border-radius: 5px;
  }

  .content li {
    list-style: none;white-space:nowrap
  }

  .mouseOver {
    color: #46bd87;
  }

  .isActive {
    color: #46bd87;
  }
</style>
