let express = require('express');
let router = express.Router();
let article = require('../Modules/article')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/articleInfo', function(req, res, next) {
  article.ArticleInfo(req.body, data => {

    res.send(data);
  })
});

router.get('/getArticleLabel', function(req, res, next) {
  article.getArticleLabel(data => {

    res.send(data);
  })
});



module.exports = router;
