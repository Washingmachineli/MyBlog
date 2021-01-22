var db = require('../MongoDB/connectDB')
var mongoose = require('mongoose')


exports.LoginCheck = function(options, callback) {

  db.find("Accounts",{"username":options.username, "password":options.password},function(err,result){

    if(err){
      return callback('-3')//服务器错误
    }
    if(result.length == 0){
      return callback('-1')//查无
    }
    else{/*
      let res = []
      res.push({
        department: result[0].department,
        isManagement: result[0].isManagement
      })*/
      return callback('1')
    }
  })
}


