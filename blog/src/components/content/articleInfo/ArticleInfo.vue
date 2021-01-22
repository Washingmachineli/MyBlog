<template>
  <div id="article-info">
    <div class="item" v-for="item in articleInfo">
      <div class="picture">
        <img :src="item.picture" @load="pictureLoad"/>
      </div>
      <div class="info">
        <div class="title">{{item.title}}</div>
        <div class="author">{{item.author}}</div>
        <div class="describe">简介：{{item.describe}}</div>
        <div class="other">
          <span class="label"
                :style="{'color': labelInfo[x].color,'background-color': labelInfo[x].backgroundColor}"
                v-for="x in item.label">{{x}}</span>
          <div class="creat-time">{{item.createTime}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {debounce} from "../../../common/utils";

  export default {
    name: "ArticleInfo",
    props: {
      articleInfo: {
        type: Array,
        default: []
      },
      labelInfo: {
        type: Object,
        default: {}
      }
    },
    methods: {
      //图片加载好后，将高度发送给父组件
      pictureLoad() {
        let article = document.getElementById('article-info')
        debounce(this.$emit('articleLoad', window.getComputedStyle(article).height), 100);
      }
    },
  }
</script>

<style scoped>

  @font-face
  {
    font-family: articleTitle;
    src: url('~assets/font/人间便利店.ttf'); /* IE9+ */
  }

  @font-face
  {
    font-family: describeTitle;
    src: url('~assets/font/人间便利店.ttf'); /* IE9+ */
  }

  @font-face
  {
    font-family: articleCreateTime;
    src: url('~assets/font/濑户字体.ttf'); /* IE9+ */
  }

  .item {
    width: 100%;
    height: 100%;
    align-items: center;
    margin: 20px 0;
    border-radius: 20px;
    display: flex;
    box-shadow: 3px 5px 5px #888888;
    color:black;
  }

  .picture {
    width: 40%;
    height: 250px;
    overflow: hidden;
    border-radius: 20px;
  }

  .picture img {
    width: 100%;
    height: 250px;
    background-size: cover;
    transition: all .4s;
  }

  .picture img:hover{
    transform: scale(1.2);
  }

  .info {
    width: 60%;
    padding-left: 10px;
    text-align: center;
  }

  .title, .author{
    padding-top: 10px;
    font-family: articleTitle;
    display: inline-block;
  }

  .describe {
    padding-top: 20px;
    font-size: 20px;
    font-family: '楷体';
  }

  .title {
    font-size: 50px;
    font-weight: bold;
  }

  .author {
    font-size: 25px;
  }

  .other {
    font-size: 15px;
    padding-top: 30px;
  }

  .label {
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 5px;/*
    background-color: red;
    color: white;*/
  }

  .creat-time {
    padding-top: 20px;
    font-family: articleCreateTime;
  }
</style>
