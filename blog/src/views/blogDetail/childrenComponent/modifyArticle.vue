<template>
  <div class="detail-modify">
    <div class="title-table">
      <div>
        标题：
      </div>
      <div class="title-table-info">
        <input class="title-table-name" id="articleName" autocomplete="off"  v-model="articleTitle" type="text"  ref="articleName">
      </div><br/><br/>
      <div>
        作者：
      </div>
      <div class="title-table-info">
        <input class="title-table-author" id="articleAuthor" autocomplete="off"  v-model="articleAuthor" type="text"  ref="articleAuthor">
      </div>
    </div>
    <br/><br/><br/><br/>
    <div class="table-label">
      <div class="table-label-title">
        标签：
      </div>
      <div class="table-label-show" v-for="item in article.label">

            <span class="table-label-item"
                  :style="{'background-color': randomColor(item)}">{{item}}</span>
        <div class="deleted-label" @click="deleteLabel(item)">X</div>
      </div>
      <div v-if="!isAddLabel" class="add-label" @click="addLabel()">添加标签</div>
      <div v-else class="new-label">
        <div class="title-table-info">
          <input class="title-table-label"  id="newLabel" autocomplete="off"  placeholder="标签" type="text"  ref="articleAuthor">
        </div>
        <div  class="add-label-button" @click="confirmAddLabel()">添加</div>
      </div>
    </div>
    <div class="table-kind">
      <div class="table-kind-title">
        分类：
      </div>
      <div class="table-kind-select">
        <select-list :article-kind="articleKinds" :choose="article.kind" ref="selectKind"/>
      </div>
      <div v-if="!isAddKind" class="table-kind-button">
        <div class="add-kind" @click="addKind()">添加分类</div>
      </div>
      <div v-else class="new-kind">
        <div class="table-kind-info">
          <input class="table-kind-content"  id="newKind" autocomplete="off"  placeholder="文章分类" type="text"  ref="articleAuthor">
        </div>
        <div class="table-kind-button" @click="confirmAddKind()">添加</div>
      </div>
      <br/>
      <br/>
      <div class="table-describe">
        <div class="table-describe-title">
          简介：
        </div>
        <div class="table-describe-info">
          <textarea class="table-describe-content" style='resize: none;' id="articleDescribe" v-model="articleDescribe" type="text"  ref="articleName"></textarea>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <div class="table-img">
        <div class="table-img-title">封面：</div>
        <div class="table-img-content"><upload-img :img="article.picture" :img-show="true" ref="uploadImg"/></div>
      </div>
    </div>
    <tinymce-editor ref="editor"
                    :disabled="disabled"
                    :height="400"
                    :plugins="plugins"
                    :toolbar="toolbar"
                    :value="article.content"/>
    <br/>
    <div class="article-operation">
      <div class="article-back" @click="articleBack()">返回</div>
      <div class="article-modify" @click="articleConfirmModify()">修改</div>
    </div>
  </div>

</template>

<script>
  import TinymceEditor from "@/components/common/tinymceEditor/TinymceEditor";
  import SelectList from "@/components/common/selectList/SelectList";
  import Toast from "@/components/common/toast/Toast";

  import {randomColorMixin} from "@/common/mixin";
  import {getArticleKind} from "@/network/app";
  import {modifyArticle} from "@/network/blog";
  import UploadImg from "@/components/common/uploadImg/UploadImg";

  export default {
    name: "modifyArticle",
    inject:['refreshNavbar'],
    components: {
      UploadImg,
      SelectList,
      TinymceEditor
    },
    mixins:[randomColorMixin],
    props: {
      article: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        isAddLabel: false,
        isAddKind: false,
        disabled: false,
        plugins: '',
        toolbar: 'undo redo | bold italic forecolor backcolor',
        articleKinds: ['san','1','3'],
        articleTitle: '',
        articleAuthor: '',
        articleDescribe: '',
      }
    },
    created() {
      getArticleKind().then( res => {
        this.articleKinds = res
      })
      this.articleTitle = this.article.title
      this.articleAuthor = this.article.author
      this.articleDescribe = this.article.describe
    },
    methods: {
      articleBack() {
        this.$emit('scrollTop')
      },
      articleConfirmModify() {
        let id = this.article.id
        let articleName = document.getElementById('articleName').value
        let articleAuthor = document.getElementById('articleAuthor').value
        let articleLabel = this.article.label
        let articleKind = this.$refs.selectKind.getValue()
        let articleDescribe = document.getElementById('articleDescribe').value
        let articleImg= this.$refs.uploadImg.getValue()
        let articleContent = this.$refs.editor.getValue()
        modifyArticle(id,articleName, articleAuthor,  articleLabel, articleKind, articleDescribe, articleImg, articleContent).then( res => {
          if(res == '-1') {
            this.$toast.show('已存在同名文章！', 3000)
          }
          else {
            this.$toast.show('修改成功！', 3000)
            this.$emit('articleChange')
            this.refreshNavbar()
          }
        })

      },
      //添加标签
      addLabel() {
        this.isAddLabel = true
      },
      confirmAddLabel() {
        let newLabel = document.getElementById('newLabel').value
        if(this.article.label.indexOf(newLabel) !== -1)
        {
          this.$toast.show('已存在该标签！', 3000)
        }
        else if(newLabel == '') {
          this.$toast.show('标签不能为空！', 3000)
        }
        else {
          this.article.label.push(document.getElementById('newLabel').value)
          this.isAddLabel = false
        }
      },
      //点击删除标签按钮
      deleteLabel(item) {
        this.article.label.splice(this.article.label.indexOf(item), 1)
      },
      //添加分类
      addKind() {
        this.isAddKind = true
      },
      confirmAddKind() {
        this.articleKinds.push(document.getElementById('newKind').value)
        this.isAddKind = false
      }
    }
  }
</script>

<style scoped>
  .article-operation {
    text-align: center;
  }

  .article-modify, .article-back{
    display: inline-block;
    padding: 2px 5px;
    margin: 5px 15px;
    color: white;
    border-radius: 5px;
    line-height: 30px;
    background-color: #48AA71;
  }


  /*标题*/
  .title-table {
    padding: 10px 0;
    height: 60px;
  }

  .title-table div{
    display: inline-block;
    line-height: 40px;
  }

  .title-table-info {
    width: 40%;
    height: 40px;
    border: 1px solid #cad1d7;
    border-radius: 8px;
    align-items: center;
    vertical-align: middle;
    position: relative;
  }

  .title-table-name, .title-table-author, .title-table-label{
    position: absolute;
    top: 0;
    left: 5%;
    bottom: 0;
    line-height: 38px;
    display: inline-block;
    width: 95%;
    border: 0;
    outline:none;
    border-radius: 8px;
    background-color: #fff;
  }

  /*标签*/
  .table-label {
    padding-bottom: 20px;
  }

  .table-label-title, .table-label-show{
    display: inline-block;
    position: relative;
    line-height: 50px;
  }

  .add-label{
    text-align: center;
    display: inline-block;
    width: 80px;
    padding: 2px 5px;
    color: white;
    border-radius: 5px;
    line-height: 30px;
    margin-left: 20px;
    background-color: #48AA71;
  }

  .new-label {
    margin:20px 0;
    vertical-align: middle;
  }

  .new-label div {
    display: inline-block;
  }

  .add-label-button {
    display: inline-block;
    padding: 2px 5px;
    margin-left: 5%;
    color: white;
    border-radius: 5px;
    line-height: 30px;
    background-color: #48AA71;
  }

  .table-label-item {
    margin: 0 10px;
    padding: 5px 10px;
    border-radius: 8px;/*
      background-color: red;*/
    color: white;
    position: relative;
  }

  .deleted-label {
    position: absolute;
    content: 'X';
    text-align: center;
    font-size: 15px;
    line-height: 20px;
    width: 20px;
    height: 20px;
    right:  0px;
    top: 0;
    border-radius: 10px;
    background-color: red;
    color: white;
  }

  /*分类选择下拉框*/
  .table-kind-title, .table-kind-select{
    display: inline-block;
  }

  .add-kind{
    text-align: center;
    width: 80px;
    padding: 2px 5px;
    color: white;
    border-radius: 5px;
    line-height: 30px;
    background-color: #48AA71;
  }

  .new-kind {
    display: block;
    margin:20px 0;
    vertical-align: middle;
  }

  .new-kind div{
    display: inline-block;
  }


  .table-kind-info {
    width: 40%;
    height: 40px;
    border: 1px solid #cad1d7;
    border-radius: 8px;
    align-items: center;
    vertical-align: middle;
    position: relative;
  }

  .table-kind-content{
    position: absolute;
    top: 0;
    left: 5%;
    bottom: 0;
    line-height: 38px;
    display: inline-block;
    width: 95%;
    border: 0;
    outline:none;
    border-radius: 8px;
  }

  .table-kind-button {
    display: inline-block;
    padding: 2px 5px;
    margin-left: 5%;
    color: white;
    border-radius: 5px;
    line-height: 30px;
    background-color: #48AA71;
  }

  /*描述*/
  .table-describe {
    padding: 10px 0;
    height: 60px;
  }

  .table-describe div{
    display: inline-block;
    line-height: 40px;
  }

  .table-describe-info {
    width: 60%;
    height: 100px;
    border: 1px solid #cad1d7;
    border-radius: 8px;
    align-items: center;
    vertical-align: middle;
    position: relative;
    background-color: #fff;
  }

  .table-describe-content{
    position: absolute;
    top: 5px;
    left: 4%;
    bottom: 0;
    line-height: 30px;
    display: inline-block;
    width: 95%;
    border: 0;
    outline:none;
    border-radius: 8px;
  }


  .table-img {
    padding: 10px 0;
    line-height: 150px;
  }

  .table-img div{
    display: inline-block;
    line-height: 40px;
  }
</style>
