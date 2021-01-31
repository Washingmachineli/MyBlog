import {getArticleInfo, getLabelInfo} from "../network/home";

export const articleListMixin = {
  data(){
    return {
      articleInfo: {},
      labelInfo: {},
    }
  },
  created() {
    this._getLabelInfo()
  },
  methods: {
    //获取所有文章信息,取消异步，同步执行
    async _getArticleInfo() {
      await getArticleInfo().then(data => {
        this.articleInfo = data
      })
    },
    //获取所有标签样式
    async _getLabelInfo() {
      await getLabelInfo().then(data => {
        this.labelInfo = data
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
  }
}


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
