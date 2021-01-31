var express = require('express');
var router = express.Router();
var login = require('../Modules/login')
let article = require('../Modules/article')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('success!');
  console.log('success!')
});

router.post('/login', function(req, res) {
  var params = req.body;
  login.LoginCheck(params, data => {

    res.send(data);
  })
});

/*获取文章分类*/
router.get('/getArticleKind', function(req, res) {
  article.articleKind(data => {
    res.send(data);
  })
});

module.exports = router;
