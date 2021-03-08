<template>
  <div class="article-info" id="article-info" v-if="Object.keys(articleInfo).length !== 0">
    <div class="item" v-for="item in articleInfo">
      <div class="picture">
        <img v-lazy="item.picture" @load="pictureLoad"/>
      </div>
      <div class="info">
        <div class="title" @click="titleClick(item.id)">{{item.title}}</div>
        <div class="author">{{item.author}}</div>
        <div class="describe">简介：{{item.describe?item.describe:'暂无简介'}}</div>
        <div class="other">
          <span class="label"
                v-for="x in item.label"
                :style="{'background-color': randomColor(x)}">{{x}}</span>
          <div class="creat-time">{{item.createTime | dataStringToDate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {debounce} from "../../../common/utils";
  import {toDate} from "../../../common/utils";
  import {randomColorMixin} from "../../../common/mixin";

  export default {
    name: "ArticleInfo",
    mixins: [randomColorMixin],
    props: {
      articleInfo: {
        type: Array,
        default: []
      },/*
      labelInfo: {
        type: Object,
        default: ()=>{}
      }*/
    },
    filters: {
      dataStringToDate(value) {
        let date = toDate(value)
        return date
      }
    },
    methods: {
      //图片加载好后，将高度发送给父组件
      pictureLoad() {

        let article = document.getElementById('article-info')
 /*       debounce(this.$emit('articleLoad', window.getComputedStyle(article).height), 100);
*/
        const heightSend = debounce(() => {
          this.$emit('articleLoad', window.getComputedStyle(article).height)
        },500)

        heightSend()

      },
      titleClick(id) {//{name:'/blogDetail'}, params:{'参数':'参数Value'}
        this.$store.dispatch('addCurrentArticle', id)
        this.$router.push('/blogDetail')
      }
    },
  }
</script>

<style scoped>


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
    background-color: #fff;
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
    font-family: '华文楷体';
  }

  .title {
    padding-top: 15px;
    font-size: 50px;
    font-weight: bold;
  }

  .author {
    padding-top: 5px;
    font-size: 20px;
  }

  .describe {
    padding-top: 15px;
    font-size: 20px;
    line-height: 30px;
    font-family: describeTitle;
  }

  .other {
    font-size: 15px;
    padding-top: 15px;
  }

  .label {
    margin: 0 5px;
    padding: 2px 5px;
    border-radius: 5px;/*
    background-color: red;*/
    color: white;
  }

  .creat-time {
    padding-top: 20px;
    font-family: articleCreateTime;
  }

  .title:hover {
    cursor:pointer
  }
</style>
