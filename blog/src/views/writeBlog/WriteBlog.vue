<template>
  <div class="write-blog">
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true">
      <div class="detail-modify">
        <div class="title-table">
          <div>
            标题：
          </div>
          <div class="title-table-info">
            <input class="title-table-name" id="articleName"  autocomplete="off"  type="text"  ref="articleName">
          </div><br/><br/>
          <div>
            作者：
          </div>
          <div class="title-table-info">
            <input class="title-table-author" id="articleAuthor"  autocomplete="off"  type="text"  ref="articleAuthor">
          </div>
        </div>
        <br/><br/><br/><br/>
        <div class="table-label">
          <div class="table-label-title">
            标签：
          </div>
          <div class="table-label-show" v-for="item in articleLabel">

            <span class="table-label-item"
                  :style="{'background-color': randomColor(item)}">{{item}}</span>
            <div class="deleted-label" @click="deleteLabel(item)">X</div>
          </div>
          <div v-if="!isAddLabel" class="add-label" @click="addLabel()">添加标签</div>
          <div v-else class="new-label">
            <div class="title-table-info">
              <input class="title-table-label"  id="newLabel"  autocomplete="off"  placeholder="标签" type="text"  ref="articleAuthor">
            </div>
            <div  class="add-label-button" @click="confirmAddLabel()">添加</div>
          </div>
        </div>
        <div class="table-kind">
          <div class="table-kind-title">
            分类：
          </div>
          <div class="table-kind-select">
            <select-list :article-kind="articleKinds" :choose="chooseKinds" ref="selectKind"/>
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
              <textarea class="table-describe-content" style='resize: none;' id="articleDescribe" type="text"  ref="articleName"></textarea>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <div class="table-img">
            <div class="table-img-title">背景：</div>
            <div class="table-img-content"><upload-img ref="uploadImg"/></div>
          </div>
        </div>
        <tinymce-editor ref="editor"
                        :disabled="disabled"
                        :height="1000"
                        :plugins="plugins"
                        :toolbar="toolbar"/>
        <br/>
        <div class="article-operation">
          <div class="article-modify" @click="articleConfirmModify()">发布</div>
        </div>
      </div>
      <floor class="floor"/>
    </scroll>

    <back-top v-show="isShowBackTop"
              @click.native="backClick"/>
  </div>


</template>

<script>
import TinymceEditor from "@/components/common/tinymceEditor/TinymceEditor";
import SelectList from "@/components/common/selectList/SelectList";
import Toast from "@/components/common/toast/Toast";

import {randomColorMixin, showBackTop, scrollSet, checkLogin} from "@/common/mixin";
import {getArticleKind} from "@/network/app";
import {addArticle} from "@/network/blog";
import {mapGetters} from "vuex";
import UploadImg from "@/components/common/uploadImg/UploadImg";

export default {
  name: "WriteBlog",
  components: {
    UploadImg,
    SelectList,
    TinymceEditor
  },
  mixins:[randomColorMixin, showBackTop, scrollSet, checkLogin],
  data() {
    return {
      isAddLabel: false,
      isAddKind: false,
      disabled: false,
      plugins: '',
      toolbar: 'undo redo | bold italic forecolor backcolor',
      articleLabel: [],
      articleKinds: ['san','1','3'],
      articleTitle: '',
      articleAuthor: '',
      articleDescribe: '',
      chooseKinds: ''
    }
  },
  computed:{
    ...mapGetters(['articleKind']),
  },
  created() {



    getArticleKind().then( res => {
      this.articleKinds = res
    })
  },
  methods: {
    articleConfirmModify() {
      let articleName = document.getElementById('articleName').value
      let articleAuthor = document.getElementById('articleAuthor').value
      let articleLabel = this.articleLabel
      let articleKind = this.$refs.selectKind.getValue()
      let articleDescribe = document.getElementById('articleDescribe').value
      let articleImg= this.$refs.uploadImg.getValue()
      let articleContent = this.$refs.editor.getValue()

      addArticle(articleName, articleAuthor, articleKind, articleDescribe, articleLabel, articleImg, articleContent).then( res => {
        if(res == '-1') {
          this.$toast.show('已存在同名文章！', 3000)
        }
        else if(res == '1')
        {
          this.$toast.show('发布成功！', 3000)
          //重置
          this.articleLabel = []
          this.articleTitle = ''
          this.articleAuthor = ''
          this.articleDescribe = ''
          this.chooseKinds = ''
          getArticleKind().then( res => {
            this.articleKinds = res
          })
        }
      })
    },
    //添加标签
    addLabel() {
      this.isAddLabel = true
    },
    confirmAddLabel() {
      let newLabel = document.getElementById('newLabel').value
      if(this.articleLabel.indexOf(newLabel) !== -1)
      {
        this.$toast.show('已存在该标签！', 3000)
      }
      else if(newLabel == '') {
        this.$toast.show('标签不能为空！', 3000)
      }
      else {
        this.articleLabel.push(document.getElementById('newLabel').value)
        this.isAddLabel = false
      }
    },
    //点击删除标签按钮
    deleteLabel(item) {
      this.articleLabel.splice(this.articleLabel.indexOf(item), 1)
    },
    //添加分类
    addKind() {
      this.isAddKind = true
    },
    confirmAddKind() {
      this.articleKinds.push(document.getElementById('newKind').value)
      this.chooseKinds = document.getElementById('newKind').value
      this.isAddKind = false
    }
  }
}
</script>

<style scoped>

  .write-blog {
    position: relative;
    height: 100vh;
    background-color: #fff;
    background-image: none;
  }

  .scroll {
    position: absolute;
    overflow: hidden;
    top: 65px;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .detail-modify {
    padding: 25px 15%;
    position:relative;
  }

  .detail-modify:before{
    position: absolute;
    background-image: url('../../assets/img/BlogDetail/几何元素背景.jpg');
    background-size:contain;/*
    background-image: url("~assets/img/BlogDetail/雪压梅花枝.png");*/
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: '';
    opacity: .2;
    z-index: -1;
  }

  .article-operation {
    text-align: center;
  }

  .article-modify{
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
    background-color: #fff;
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
