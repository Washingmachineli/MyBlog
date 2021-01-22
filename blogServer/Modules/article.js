var db = require('../MongoDB/connectDB')
var mongoose = require('mongoose')


exports.getArticleInfo = function(callback) {
  db.find("Article",{},function(err,result){

    if(err){
      return callback("-3")//服务器错误
    }
    if(result.length == 0){
      return callback("-1")//查无
    }
    else{
      let res = []
      let i = 0
      while (result[i])
      {
        res.push({
          title: result[i].title,
          author: result[i].author,
          kind: result[i].kind,
          describe: result[i].describe,
          label: result[i].label,
          picture: result[i].picture,
          createTime: result[i].createTime,
        });
        i++
      }
      return callback(res)
    }
  })
}

//findArticleByKind
exports.findArticleByKind = function(params, callback) {
  db.find("Article",{'label': params.label},function(err,result){

    if(err){
      return callback("-3")//服务器错误
    }
    if(result.length == 0){
      return callback("-1")//查无
    }
    else{
      let res = {}
      let i = 0
      while (result[i]){
        res[result[i].title] = {
          describe: result[i].describe
        }
        i++
      }
      return callback(res)
    }
  })
}
