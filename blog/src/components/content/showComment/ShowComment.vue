<template>
  <div class="other-comment">
    <div class="other-comment-head">
      全部评论
    </div>
    <div v-if="Object.keys(comments).length !== 0">
      <div class="commentShow" :class="{isReply: (item == currentReply)}" v-for="item in comments" >
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
          <div v-show="isAdmin && (item.reply == undefined)" class="comment-show-reply"><div @click="replyClick(item)" :class="{isActive: (item == currentReply)}">回复</div></div>
          <div v-show="isAdmin" class="comment-show-delete"><div @click="commentDelete(item.id)" >删除</div></div>
        </div>
        <div class="reply-comment" v-show="(item.reply !== undefined)">
          <div class="reply-comment-left">
            <div  class="comment-show-user">博主回复：</div>
            <div v-html="item.reply" class="comment-show-content"></div>
          </div>
          <div class="reply-comment-right">
            <div class="comment-show-time">{{item.replyTime | dataStringToDate}}</div>
            <div v-show="isAdmin" class="comment-show-delete"><div @click="replyDeleted(item.id)"  >删除</div></div>
          </div>
        </div>
        <div class="write-reply" v-if="item == currentReply">
          <div class="reply-edit">

            <tinymce-editor ref="editor"
                            :disabled="disabled"
                            :height="150"
                            :plugins="plugins"
                            :toolbar="toolbar"/>
          </div>
          <div class="reply-button">
            <div @click="send(item.id)">评论</div>
            <div @click="clear">清空内容</div>
          </div>
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
    <dialog-message ref="message"
                    :is-show="dialogShow"
                    :wid-num="30"
                    :left-site="35"
                    :dialog-kind="2"
                    @dialogClose="dialogClose"
                    @chooseYes="chooseYes"
                    @chooseNo="chooseNo">
      <div slot="header">提醒</div>
      <div slot="main">确认删除该评论吗？</div>
    </dialog-message>
  </div>
</template>

<script>
  import TinymceEditor from "@/components/common/tinymceEditor/TinymceEditor";
  import DialogMessage from "@/components/common/dialogMessage/DialogMessage";
  import Toast from "@/components/common/toast/Toast";

  import { getComment } from "@/network/blog";
  import { replyComment, replyDelete, commentDelete} from "@/network/message";
  import { toDate } from "@/common/utils";


  export default {
    name: "ShowComment",
    components: {
      DialogMessage,
      TinymceEditor
    },
    props: {
      article: '',
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    inject:  ['reload'],
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
        currentReply: null,
        disabled: false,
        plugins: '',
        toolbar: 'undo redo | bold italic forecolor backcolor',
        dialogShow: false,
        currentId: null,
        currentDelete: null,
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
      },
      replyClick(item) {
        if(item == this.currentReply) {
          this.currentReply = null
        }
        else {
          this.currentReply = item
        }
      },
      // 鼠标单击的事件
      send(id) {
        let reply = this.$refs.editor[0].getValue()
        replyComment(id, reply).then( res => {
          if(res.state == '1') {
            this.$toast.show('评论成功！', 3000)
            this.reload()
          }
          else {
            this.$toast.show(' 评论失败！', 3000)
          }
        })
      },
      commentDelete(id) {
        this.currentId = id
        this.currentDelete = 'comment'
        this.dialogShow = true
        this.$emit('scrollCenter')
      },
      replyDeleted(id) {
        this.currentId = id
        this.currentDelete = 'reply'
        this.dialogShow = true
        this.$emit('scrollCenter')
      },
      // 清空内容
      clear() {
        this.$refs.editor[0].clear()
      },
      dialogClose() {
        this.dialogShow = false
      },
      chooseYes() {
        this.dialogShow = false
        if(this.currentDelete == 'reply') {
          replyDelete(this.currentId).then( res => {
            if(res.state === '1') {
              this.$toast.show('删除评论成功！', 3000)
              this.$router.go(0)
            }
            else {
              this.$toast.show('删除评论失败！', 3000)
            }
          })
        }
        else if(this.currentDelete == 'comment') {
          commentDelete(this.currentId).then( res => {
            if(res.state === '1') {
              this.$toast.show('删除评论成功！', 3000)
              this.$router.go(0)
            }
            else {
              this.$toast.show('删除评论失败！', 3000)
            }
          })
        }
      },
      chooseNo() {
        this.dialogShow = false
      },
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

  .commentShow{
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }


  .commentShow div {
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

  .comment-show-reply, .comment-show-delete{
    padding-top: 20px;
    color: white;
    padding-left: 25%;
    padding-right: 25%;
  }

  .comment-show-reply div, .comment-show-delete div{
    border-radius: 5px;
    line-height: 30px;
    background-color: #48AA71;
  }

  .comment-show-delete div{
    border-radius: 5px;
    line-height: 30px;
    background-color: #E72500;
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

  /*回复*/
  .reply-comment {
    margin-left: 10%;
    margin-right: 5%;
    margin-top: 10px;
    padding: 10px 5px;
    background-color: #F2F2F5;
  }

  .reply-comment-left {

    padding-left: 1em;
    width: 75%;
    display: inline-block;
  }

  .reply-comment-right {
    text-align: center;
    width: 25%;
    display: inline-block;
  }

  /*评论*/

  .isReply {
    background-color: #F2F2F5;
  }

  .isActive{
    background-color: #458F64!important;
  }

  .write-reply {
    width: 100%;
    padding-top: 20px;
    padding-left: 10%;
    padding-right: 5%;
    display: table;
    vertical-align: middle;
    text-align: center;
    align-items: center;
  }

  .reply-edit{
    /*margin-left: 20%;*/
    display: table-cell;
  }


  .reply-button {
    width: 5%;
    display: table-cell;
    color: white;
    padding: 20px 0;
  }

  .reply-button div {
    text-align: center;
    width: 80px;
    margin-left: 10px;
    margin-top: 10px;
    padding: 5px 5px;
    background-color: #48AA71;
    box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
  }

  .reply-button div:hover{
    background-color: #458F64;

    -webkit-transform:translateY(1px);
    -moz-transform:translateY(1px);
    -ms-transform:translateY(1px);
    -o-transform:translateY(1px);
    transform:translateY(1px);
  }

</style>
