<template>
  <div class="last-comment">
    <div class="title">
      最新评论
    </div>
    <div class="comment-show" v-for="item in commentInfo">
      <div class="left">
        <img src="~assets/img/BlogDetail/comment-user.png"/>
      </div>
      <div class="right">
        <div class="commentator">{{item.commentator}}</div>
        在
        <div class="article" @click="toArticle(item.article, item.articleId)">{{item.article}}</div>
        中留言：
        <div class="comment" >{{item.comment | deleteHtml}}</div>
      </div>
      <div class="underline"></div>
    </div>
  </div>
</template>

<script>


  export default {
    name: "LastComment",
    props: {
      commentInfo: {
        type: Object,
        default: {}
      }
    },
    methods: {
      toArticle(article, articleId) {
        if(article !== '留言板') {
          this.$store.dispatch('addCurrentArticle', articleId)
          this.$router.replace('/blogDetail')
        }
        else {
          this.$router.replace('/message').catch(err=>err);
        }
      }
    },
    filters: {
      deleteHtml(value) {
        return value.replace(/<[^>]+>/g, '')
      }
    }
  }
</script>

<style scoped>

  .last-comment {
    height: 450px;
    text-align: center;
    border-radius: 10px;
    box-shadow: 3px 3px 3px #888888;
    background-color: #fff;
    background-size: 100%, cover;
  }

  .title {
    padding: 25px 0;
    font-size: 25px;
    font-weight: bold;
    color: black;
  }

  .comment-show {
    padding: 10px 0;
    margin: 0 20px;
    text-align: left;
    height: 70px;
  }

  .left {
    display: inline-block;
    width: 8%;
    height: 50px;
  }

  .right {
    display: inline-block;
    width: 84%;
    height: 50px;
  }

  .left img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  .commentator, .article{
    display: inline-block;
    text-align: left;
    line-height: 25px;
    color: #33a57a;
    height: 25px;
  }

  .article:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .commentator {
    color: black;
  }

  .comment {
    color: rgba(0,0,0,.6);

    line-height: 25px;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
    height: 25px;
  }

  .underline{
    margin: 60px 0;
    border-bottom: 1px solid  #CCCCCC;
    transform: scaleY(0.4);
  }

</style>
