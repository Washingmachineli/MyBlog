let express = require('express');
let router = express.Router();
let article = require('../Modules/article')
let label = require('../Modules/label')
let comment = require('../Modules/comment')


//获取指定文章
router.post('/findArticle', function(req, res, next) {
  let params = req.body;
  article.findArticle(params,data => {
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

module.exports = router