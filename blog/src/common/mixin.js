import {getArticleInfo, getLabelInfo} from "../network/home";

export const articleListMixin = {
  data(){
    return {
      articleInfo: [],
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
      content.style.height = height;
      console.log(content.style.height);
    }
  }
}
