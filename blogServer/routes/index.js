let express = require('express');
let router = express.Router();
let login = require('../Modules/login')
let article = require('../Modules/article')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('success!');
  console.log('success!')
});


//登陆验证
router.post('/login', function(req, res) {
  let params = req.body;
  login.LoginCheck(params, data => {

    res.send(data);
  })
});

router.post('/checkToken', function(req, res) {
  let params = req.body;
  login.checkToken(params, data => {

    res.send(data);
  })
})

/*获取文章分类*/
router.get('/getArticleKind', function(req, res) {
  article.articleKind(data => {
    res.send(data);
  })
});

module.exports = router;
