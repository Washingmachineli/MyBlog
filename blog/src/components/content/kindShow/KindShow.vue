<template>
  <div class="label-show">
    <div class="title">
      文章分类
    </div>
    <div>
      <span class="kind"
            v-for="x in kindInfo"
            :style="{'background-color': randomColor(x)}"
            @click="kindClick(x)">{{x}}</span>
    </div>
  </div>
</template>

<script>
  import {randomColorMixin} from "../../../common/mixin";

  export default {
    name: "LabelShow",
    props: {
      kindInfo: {
        type: Array,
        default: []
      }
    },
    mixins: [randomColorMixin],
    methods: {
      kindClick(kind) {


        //将选中的分类存到store
        this.$store.dispatch('changeArticleKind', kind)

        //跳转
        //catch(err=>err)防止多次点击同一路由地址产生报错
        this.$router.replace('/blog').catch(err=>err);
      }
    }
  }
</script>

<style scoped>

  .label-show {
    margin-top: 20px;
    height: 300px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 3px 3px 3px #888888;
    background-color: #fff;
  }

  .title {
    padding: 25px 0;
    font-size: 25px;
    font-weight: bold;
    color: black;
  }

  .kind {
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 5px;/*
    background-color: red;*/
    color: white;
  }

  .kind:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
