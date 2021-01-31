let db = require('../MongoDB/connectDB')
let mongoose = require('mongoose')
let ObjectID = require('mongodb').ObjectID;

exports.getArticleInfo = function(callback) {
  db.find("Article",{},function(err, result){

    if(err){
      return callback("-3")//服务器错误
    }
    if(result.length == 0){
      return callback("-1")//查无
    }
    else{
      let res = {}
      let i = 0
      while (result[i])
      {
        res[result[i].title] = {
          id: result[i]._id,
          author: result[i].author,
          describe: result[i].describe,
          label: result[i].label,
          picture: result[i].picture,
          createTime: result[i].createTime,
        }
        i++
      }
      return callback(res)
    }
  })
}


//获取文章分类
exports.articleKind = function(callback) {
  db.distinct("Article",[{$group: {_id: '$kind'}}], function(err, result){

    if(err){
      return callback("-3")//服务器错误
    }
    if(result.length == 0){
      return callback("-1")//查无
    }
    else{
      let res = []
      let i = 0
      while (result[i]){
        res[i] = result[i]._id
        i++
      }
      return callback(res)
    }
  })
}


//获取带有指定标签的文章
exports.findArticleInfoByKind = function(params, callback) {
  db.find("Article",{'label': params.label},function(err, result){

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
          id: result[i]._id,
          author: result[i].author,
          describe: result[i].describe,
          label: result[i].label,
          picture: result[i].picture,
          createTime: result[i].createTime,
        }
        i++
      }
      return callback(res)
    }
  })
}


//获取指定的文章
exports.findArticle = function(params, callback) {
  db.find("Article",{'_id': ObjectID(params.id)},function(err, result){

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
          id: result[i]._id,
          author: result[i].author,
          describe: result[i].describe,
          label: result[i].label,
          content: result[i].content,
          picture: result[i].picture,
          createTime: result[i].createTime,
        }
        i++
      }
      return callback(res)
    }
  })
}