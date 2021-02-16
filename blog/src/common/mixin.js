

import Scroll from "@/components/common/scroll/Scroll";
import Floor from "@/components/common/floor/Floor";

import BackTop from "@/components/common/backTop/BackTop";

import {ArticleInfo, getArticleLabel} from "../network/home";
import {getArticleByKind, getLabelByKind} from "@/network/blog";
import {mapGetters} from "vuex";

//获取所有文章列表信息
export const articleListMixin = {
  data(){
    return {
      articleInfo: [],
      labelInfo: [],
      page: 0 ,
    }
  },
  created() {
    this._getLabel()
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
    //获取所有标签
    async _getLabel() {
      await getArticleLabel().then(res => {
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
  }
}

//获取指定分类的文章列表
export const articleListByKindMixin = {
  data(){
    return {
      articleInfo: {},
      labelInfo: [],
      kind: {
        type: String,
        default: '散文'
      },
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
      sessionStorage.setItem("articleKind", "");
      sessionStorage.setItem("articleKind", this.articleKind);
    });
    this._getLabel()
  },
  methods: {
    //获取所有文章信息,取消异步，同步执行
    async _getArticleInfo() {
      await getArticleByKind(this.articleKind).then( res => {
        this.articleInfo = res
      })
    },
    //获取所有标签
    async _getLabel() {
      await getLabelByKind(this.articleKind).then( res => {
        this.labelInfo = res
        this._getArticleInfo()
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

//返回顶部
export const scrollSet = {
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
    }
  }

}
