<template>
  <div class="nav-bar-item">
    <ul class="content">
      <li :class="{mouseOver:(currentMouse === item), isActive:(currentIndex === item) || (currentPath === link[index])}"
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
        default: ()=>[]
      },
      link: {
        type: Array,
        default: ()=>[]
      },
      titleIndex: 0
    },
    data() {
      return {
        currentMouse: null,
        currentIndex: null,
      }
    },
    computed: {
      currentPath() {
        return this.$route.path
      }
    },
    methods: {
      overShow(item) {
        this.currentMouse = item;
      },
      overHidden() {
        this.currentMouse = null;
      },
      itemClick(item, index) {

        this.$emit("labelClick")

        this.currentIndex = item
        const path = this.link[index]

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

  .content {
    position: absolute;
    top: 40px;
    left: -50px;
    width: 60px;
    background-color: #fff;
    text-align: center;
    font-size: 17px;
  }

  .content {
    border:2px solid #ddd;
    border-radius: 5px;
  }

  .content li {
    list-style: none;
  }

  .mouseOver {
    color: #46bd87;
  }

  .isActive {
    color: #46bd87;
  }
</style>
