import Scroll from "@/components/common/scroll/Scroll";
import Floor from "@/components/common/floor/Floor";

import BackTop from "@/components/common/backTop/BackTop";

import {ArticleInfo, } from "../network/home";
import {getArticleByKind, articleKind, getLabelByKind} from "@/network/blog";
import {checkToken} from "@/network/login";
import {mapGetters} from "vuex";

//获取所有文章列表信息
export const articleListMixin = {
  data(){
    return {
      articleInfo: [],
      kindInfo: [],
      page: 0 ,
    }
  },
  created() {
    this._getKind()
    this._getArticleInfo()
  },
  methods: {
    //获取所有文章信息,取消异步，同步执行
    async _getArticleInfo() {
      await ArticleInfo(this.page).then(res => {
        let obj = Object.keys(res.data)
        let i = 0
        while (obj[i]) {
          this.articleInfo.push(res.data[i]);
          i++
        }
        this.page = this.page + 1
      })
    },
    //获取所有文章分类
    async _getKind() {
      await articleKind().then(res => {
        this.kindInfo = res
      })
    },

    //填充父组件高度
    articleLoad(height){
      let content = document.getElementById('content')
      if(content.style.height < height) {
        content.style.height = height;
      }
    }
  }
}

//获取指定分类的文章列表
export const articleListByKindMixin = {
  data(){
    return {
      articleInfo: [],
      labelInfo: [],
      kind: {
        type: String,
        default: '散文'
      },
      page: 0,
    }
  },
  computed:{
    ...mapGetters(['articleKind']),
  },
  created() {

    //页面加载时,如果vuex中指定值为空则更新vuex
    if (sessionStorage.getItem("articleKind") && this.articleKind == null) {
      this.$store.dispatch('changeArticleKind', sessionStorage.getItem("articleKind"))
    }
    //页面刷新时，将vuex中指定值的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("articleKind", "")
      sessionStorage.setItem("articleKind", this.articleKind)
    });
    this._getLabel()
    this._getArticleInfo()
  },
  methods: {
    //获取所有文章信息,取消异步，同步执行
    async _getArticleInfo() {
      await getArticleByKind(this.articleKind, this.page).then( res => {
        if(res === -1){
          articleKind().then( res => {
            this.$store.dispatch('changeArticleKind', res[1])
            sessionStorage.setItem("articleKind", res[1])
            this._getArticleInfo()
          })
        }
        else {
          this.articleInfo.push(...res)
          this.page = this.page + 1
        }
      })
    },
    //获取所有标签
    async _getLabel() {
      await getLabelByKind(this.articleKind).then( res => {
        this.labelInfo = res
      })
    },

    //填充父组件高度
    articleLoad(height){
      let content = document.getElementById('content')
      if(content.style.height < height) {
        content.style.height = height;
      }
    }
  },
  watch: {
    articleKind() {
      this._getLabel()
    }
  }
}


//获取随机颜色
export const randomColorMixin = {
  data() {
    return {
      colors: {},
    }
  },
  methods: {
    randomColor(content) {
      if(Object.keys(this.colors).indexOf(content) === -1)//不存在
      {
        let col = "#";
        for (let i = 0; i < 6; i++) {
          col += parseInt(Math.random() * 16).toString(16);
        }
        this.colors[content] = col;
      }
      return this.colors[content];
    }
  }
}


//返回顶部
export const showBackTop = {
  data(){
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0);
      //this.$refs.scroll.$data.scroll.scrollTo(0)
    }
  }

}

//scroll插件
export const scrollSet = {
  created() {
    this.$bus.$emit('viewLoad')
  },
  components: {
    Scroll,
    Floor
  },
  methods: {
    contentScroll(position){
      //判断是否显示backTop
      this.isShowBackTop = (-position.y) > 1000
      //判断tabControl是否要有吸顶效果
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    articleLoad() {
      this.$refs.scroll.refresh();
    },
    scrollCenter() {
      this.$refs.scroll.scrollTo(0, this.$refs.scroll.$data.scroll.maxScrollY / 2, 300)
    },
    scrollToTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  }

}

//检查是否登录
export const checkLogin = {
  inject:  ['reload'],
  computed: {
    ...mapGetters(['token', 'isLogin']),
  },
  created() {
    let t = null
    if(this.token === null)
    {
      t = sessionStorage.getItem('token')
    }
    else {
      t = this.token
    }

    checkToken(t).then( res => {
      if(res.state === 0) {
        sessionStorage.removeItem("token");
        this.$store.dispatch('clearToken')
        this.$store.dispatch('signOut')
        this.reload()
      }
      else {
        this.$store.dispatch('signIn')
      }
    })
  },
}


/*

export const musicSet = {
    data () {
      return {
        playFlag: true,
        clickMusicBtn: false,
      }
    },

    async mounted () {
      this.audioAutoPlay()
      document.addEventListener("visibilitychange", (e) => { // 兼容ios微信手Q
        if (this.clickMusicBtn) { // 点击了关闭音乐按钮
          if (this.playFlag) {
            this.audioAutoPlay();
            this.playFlag = true;
          } else {
            this.audioPause();
            this.playFlag = false;
          }

          //text.innerHTML = e.hidden;
          if (e.hidden) {  // 网页被挂起
            this.audioAutoPlay();
            this.playFlag = true;
          } else { // 网页被呼起
            this.audioPause();
            this.playFlag = false;
          }
        } else { // 未点击关闭音乐按钮
          if (this.playFlag) {
            this.audioPause();
            this.playFlag = false;
          } else {
            this.audioAutoPlay();
            this.playFlag = true;
          }

          //text.innerHTML = e.hidden;
          if (e.hidden) {  // 网页被挂起
            this.audioPause();
            this.playFlag = false;
          } else { // 网页被呼起
            this.audioAutoPlay();
            this.playFlag = true;
          }
        }
      });
    },

    methods: {
      audioPlayOrPause() {
        this.clickMusicBtn = !this.clickMusicBtn;
        if (this.playFlag) {
          this.audioPause();
          this.playFlag = false;
        } else {
          this.audioAutoPlay();
          this.playFlag = true;
        }
      },
      audioPause() {
        let audio = this.$refs.audio
        audio.pause();
        document.addEventListener("WeixinJSBridgeReady", function () {
          audio.pause();
        }, false);
      },
      audioAutoPlay() {
        let audio = this.$refs.audio
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
          audio.play();
        }, false);
      },
    },
}
*/
