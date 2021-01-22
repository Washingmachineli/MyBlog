var express = require('express');
var router = express.Router();
var login = require('../Modules/login')

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

module.exports = router;
