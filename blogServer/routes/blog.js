let express = require('express');
let router = express.Router();
let article = require('../Modules/article')
let label = require('../Modules/label')

router.post('/findArticleInfoByKind', function(req, res, next) {
  let params = req.body;
  article.findArticleInfoByKind(params,data => {
    res.send(data);
  })
});

router.post('/findArticle', function(req, res, next) {
  let params = req.body;
  article.findArticle(params,data => {
    res.send(data);
  })
});

module.exports = router