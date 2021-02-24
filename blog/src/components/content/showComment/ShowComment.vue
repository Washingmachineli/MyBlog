<template>
  <div class="other-comment">
    <div class="other-comment-head">
      全部评论
    </div>
    <div v-if="Object.keys(comments).length !== 0">
      <div class="comment-show" v-for="item in comments">
        <div class="comment-show-left">
          <img src="~assets/img/BlogDetail/comment-user.png"/>
        </div>
        <div class="comment-show-center">
          <div  class="comment-show-user">{{item.commentator}}</div>
          <div v-html="item.comment" class="comment-show-content">
          </div>
        </div>
        <div class="comment-show-right">
          <div class="comment-show-time">{{item.commentTime | dataStringToDate}}</div>
          <div v-show="isAdmin" class="comment-show-reply">回复</div>
        </div>
      </div>
      <div class="page">
        <div v-show="frontPage" @click="frontPageClick">上一页</div>
        <div v-show="pageShow" v-for="item in pages"
             :class="{current: item === currentPage}"
             @click="pageClick(item)">{{item}}</div>
        <div v-show="nextPage" @click="nextPageClick">下一页</div>
      </div>
    </div>
    <div v-else>
      <div class="comment-nothing">
        暂无评论
      </div>
    </div>
  </div>
</template>

<script>
  import { getComment } from "@/network/blog";
  import { toDate } from "@/common/utils";

  export default {
    name: "ShowComment",
    props: {
      article: '',
      isAdmin: {
        type: String,
        default: false
      }
    },
    data() {
      return {
        comments: {},
        currentPage: 0,
        commentCount: 0,
        commentPage: 0,
        frontPage: false,
        pageShow: true,
        nextPage: false,
        pages: [],
      }
    },
    created() {
      this.comment()
    },
    filters: {
      dataStringToDate(value) {
        let date = toDate(value)
        return date
      }
    },
    methods: {
      comment(){
        getComment(this.article, this.currentPage).then( res => {
          this.currentPage  = this.currentPage + 1
          this.comments = res.data
          this.commentCount = res.count
          this.commentPage = res.count % 5 == 0 ?  (res.count / 5 ) : (Math.floor(res.count / 5)+1)
          this.pageSet(this.currentPage)
        })
      },
      pageSet(page) {

        //无上一页，且无下一页
        if(page <= 1 && this.commentPage === page) {
          this.pages = [page]
          this.frontPage = false
          this.pageShow = true
          this.nextPage = false
        }
        //无上一页，有下一页
        else if(page <= 1 && this.commentPage > page) {
          this.pages = [page, page+1]
          this.frontPage = false
          this.pageShow = true
          this.nextPage = true
        }
        //有上一页，有下一页
        else if(page > 1 && this.commentPage > page) {
          this.pages = [page-1, page, page+1]
          this.frontPage = true
          this.pageShow = true
          this.nextPage = true
        }
        //有上一页，无下一页
        else if(page > 1 && this.commentPage === page) {
          this.pages = [page-1, page]
          this.frontPage = true
          this.pageShow = true
          this.nextPage = false
        }
      },
      nextPageClick() {
        this.comment()
      },
      frontPageClick() {
        this.currentPage = this.currentPage - 2;
        this.comment()
      },
      pageClick(item) {
        this.currentPage = item - 1
        this.comment()
      }
    }
  }
</script>

<style scoped>
  .other-comment{
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 2px 4px rgba(0,0,0,.035);
  }

  .other-comment-head {
    font-size: 20px;
    padding: 15px 10px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }

  .comment-show{
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }


  .comment-show div {
    align-items: center;
    vertical-align: middle;
  }

  .comment-nothing {
    line-height: 60px;
    width: 100%;
    text-align: center;

  }

  .comment-show-left img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .comment-show-left {
    text-align: center;
    width: 10%;
    display: inline-block;
  }

  .comment-show-center {
    padding-left: 1em;
    width: 75%;
    display: inline-block;
  }


  .comment-show-right {
    text-align: center;
    width: 15%;
    display: inline-block;
  }

  .comment-show-user {
    font-size: 16px;
    font-weight: 700;
  }

  .comment-show-content {
    padding-top: 20px;
    font-size: 1rem;
    font-weight: 300;
  }

  .comment-show-time {
    font-size: 13px;
    font-weight: 400;
  }

  .comment-show-reply {
    padding-top: 20px;
  }

  /*页码*/

  .page {
    text-align: right;
  }

  .page div{
    display: inline-block;
    padding: 20px 10px;
    color: black;
    cursor: pointer;
  }

  .page div:hover{
    text-decoration: underline;
  }

  .current {
    color: #48AA71!important;
    text-decoration: none!important;
  }
</style>
