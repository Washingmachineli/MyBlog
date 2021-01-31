let express = require('express');
let router = express.Router();
let article = require('../Modules/article')
let label = require('../Modules/label')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/articleInfo', function(req, res, next) {
  article.getArticleInfo(data => {

    res.send(data);
  })
});

router.get('/labelInfo', function(req, res, next) {
  label.getLabelInfo(data => {

    res.send(data);
  })
});

router.post('/findLabelInfo', function(req, res, next) {
  let params = req.body;
  label.findLabelInfo(params,data => {

    res.send(data);
  })
});



module.exports = router;
