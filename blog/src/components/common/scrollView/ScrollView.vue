<template>

  <div class="last-comment">
    <div class="title" ref="aaa">
      最新评论
    </div>
    <div class="scroll-container" @mouseover="mouseOver"  @mouseleave="mouseLeave">
      <div class="comment-show scroll-item"
           v-for="(item, index) in commentInfo"
           :key="index"
           :style="styleFormatter(index)"
           ref="scrollItem">
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
  </div>
</template>

<script>
export default {
  name: "ScrollView",
  props: {
    commentInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      colorList: [
        'gray',
        'antiquewhite',
        'aquamarine',
        'cadetblue',
        'darkgoldenrod',
        'mediumaquamarine',
        'violet',
        'royalblue'
      ],

      // 每个元素的高度
      height: 70,
      // 滚动速度
      speed: 30,

      isScrolling: true
    }
  },
  watch: {
    commentInfo() {
      this.$nextTick(() => {
        this.initListener()
        this.scroll()
      })
    },
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
    },
    //鼠标放上去时，停止滚动，离开时继续
    mouseOver () {

      this.isScrolling = false
      this.pause()
    },
    mouseLeave () {

      this.isScrolling = true
      this.scroll()
    },

    // 根据索引计算当前元素所在位置
    styleFormatter (index) {
      return {
        top: `${index * this.height}px`
      }
    },

    // 控制滚动开始
    scroll () {
      const elementList = this.$refs.scrollItem
      elementList.forEach(ele => {
        ele.style.transitionDuration =  `${(ele.offsetTop + this.height) / this.speed}s`
        ele.style.top = `-${this.height}px`
      })
    },

    // 暂停滚动
    pause () {
      const elementList = this.$refs.scrollItem
      elementList.forEach(ele => {
        const styles = getComputedStyle(ele, null)
        console.log(styles.top)
        ele.style.transitionDuration = '0s'
        ele.style.top = `${styles.top}`
      })
    },

    // 初始化listener，监听滚动动画
    // 当元素完全滚动至显示范围外时，则将该元素插入队尾
    initListener () {
      const elementList = this.$refs.scrollItem
      console.log(this.$refs);
      console.log(this.$refs.scrollItem);
      elementList.forEach(ele => {
        // 当动画结束后会触发transitionend事件
        ele.addEventListener('transitionend', () => {
          // 计算队尾位置
          const lastestElementPosition = this.lastestElementPosition()
          ele.style.transitionDuration = `0s`
          ele.style.top = `${lastestElementPosition + this.height}px`
          // 渲染完毕之后开始滚动
          this.$nextTick(() => {
            ele.style.transitionDuration = `${(ele.offsetTop + 70) / this.speed}s`
            ele.style.top = `-${this.height}px`
          })
        })
      })
    },

    // 计算最后一个元素的位置
    lastestElementPosition () {
      const elementList = this.$refs.scrollItem
      return Math.max(...elementList.map(ele => {
        // 注意，这里不能直接读取ele.style.left，这样只能读到终点位置的偏移量，而我们需要的是当前元素的实际位置，需要通过getComputedStyle来获取
        const styles = getComputedStyle(ele, null)
        return parseFloat(styles.top)
      }))
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


  .scroll-container {
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: row;
    position: relative;
    overflow: hidden;
  }

  .scroll-item {
    display: flex;
    flex-shrink: 0;

    height: 70px;
    position: absolute;
    transition-property: top;
    transition-timing-function: linear;
  }

  .btn {
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
  }



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
    width: 100%;
    height: 280px;
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
    margin-left: 8%;
    width: 80%;
    display: inline-block;
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
    width: 100%;
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
