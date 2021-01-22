var express = require('express');
var router = express.Router();
var article = require('../Modules/article')
var label = require('../Modules/label')


router.post('/labelInfo', function(req, res, next) {
  let params = req.body;
  article.findArticleByKind(params,data => {
    console.log(data)
  })
});
