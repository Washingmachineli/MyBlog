let express = require('express');
let router = express.Router();
let article = require('../Modules/article')
let comment = require('../Modules/comment')


//获取指定文章
router.post('/findArticle', function(req, res, next) {
  let params = req.body;
  article.findArticle(params,data => {
    res.send(data);
  })
});

//获取文章分类
router.get('/articleKind', function(req, res, next) {

  article.articleKind(data => {
    res.send(data);
  })
});

//获取当前分类下的所有文章
router.post('/getArticleByKind', function(req, res, next) {
  let params = req.body;
  article.getArticleByKind(params,data => {
    res.send(data);
  })
});

//获取当前分类下的所有标签
router.post('/getLabelByKind', function(req, res, next) {
  let params = req.body;
  article.getLabelByKind(params,data => {
    res.send(data);
  })
});

//获取当前分类下含有指定标签的文章
router.post('/getArticleByLabel', function(req, res, next) {
  let params = req.body;
  article.getArticleByLabel(params,data => {
    res.send(data);
  })
});

//添加评论
router.post('/addComment', function(req, res, next) {
  let params = req.body;
  comment.addComment(params,data => {
    res.send(data);
  })
});

//获取当前文章的评论
router.post('/getComment', function(req, res, next) {
  let params = req.body;
  comment.getComment(params,data => {
    res.send(data);
  })
});

//修改文章
router.post('/modifyArticle', function(req, res, next) {
  let params = req.body;
  article.modifyArticle(params,data => {
    res.send(data);
  })
});

//添加文章
router.post('/addArticle', function(req, res, next) {
  let params = req.body;
  article.addArticle(params,data => {
    res.send(data);
  })
});

//删除文章
router.post('/deleteArticle', function(req, res, next) {
  let params = req.body;
  article.deleteArticle(params,data => {
    res.send(data);
  })
});

module.exports = router