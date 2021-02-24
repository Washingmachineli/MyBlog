let db = require('../MongoDB/connectDB')
let mongoose = require('mongoose')
let jwt = require('jsonwebtoken')

exports.LoginCheck = function(params, callback) {

  db.find("Accounts",{"username":params.username, "password":params.password},function(err,result){

    let res = {
      'state': null,
      'token': null
    }

    if(err){
      res['state'] = '-3'
      return callback(res)//服务器错误
    }
    if(result.length == 0){

      res['state'] = '-1'

      return callback(res)//查无
    }
    else{
      let content ={name: params.username}; // 要生成token的主题信息
      let secretOrPrivateKey="washingmachine" // 这是加密的key（密钥）
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60*60*24*7  // 1小时过期60*60*1 60*60*24*7
      });

      res['state'] = '1'
      res['token'] = token

      return callback(res)
    }
  })
}


exports.checkToken = function(params, callback) {
  let token = params.token
  let secretOrPrivateKey="washingmachine";

  jwt.verify(token, secretOrPrivateKey, function (err, decode) {
    if (err) {  //  时间失效的时候/ 伪造的token
      return callback({'state':0})
    } else {
      return callback({'state':1})
    }
  })

}

