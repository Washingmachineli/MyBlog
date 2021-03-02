let db = require('../MongoDB/connectDB')
let mongoose = require('mongoose')
let ObjectID = require('mongodb').ObjectID;

exports.ArticleInfo = function(params, callback) {
  /*
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
  })*/

  db.getAllCount("Article", {}, function (err, result) {

    if (err) {
      return callback("-3")//服务器错误
    } else {
      let length = result;
      db.find("Article",{},{sort:{'createTime': -1}, page: params.page, pageamount: 5}, function(err, result){

        if(err){
          return callback("-3")//服务器错误
        }
        else{
          let res = {
            'data': {},
            'count': 0
          }
          let i = 0
          while (result[i])
          {
            res['data'][i] = {
              id: result[i]._id,
              title: result[i].title,
              author: result[i].author,
              describe: result[i].describe,
              label: result[i].label,
              picture: result[i].picture,
              createTime: result[i].createTime,
            }
            i++
          }
          res['count'] = length

          return callback(res)
        }
      })
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
          kind: result[i].kind,
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




//获取指定分类下的文章
exports.getArticleByKind = function(params, callback) {
 /* db.getAllCount("Article", {'kind': params.kind}, function (err, result) {

    if (err) {
      return callback("-3")//服务器错误
    } else {
      let length = result;
      db.find("Article",{'kind': params.kind}, {sort:{'createTime': -1}, page: params.page, pageamount: 5},function(err, result){

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
            res['data'][i] = {
              id: result[i]._id,
              title: result[i].title,
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
  })*/
  db.find("Article",{'kind': params.kind}, {sort:{'createTime': -1}, page: params.page, pageamount: 5},function(err, result){

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
        res[i] = {
          id: result[i]._id,
          title: result[i].title,
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




//获取所有文章的标签
exports.getArticleLabel = function(callback) {
  db.distinct("Article",[{$group: {_id: '$label'}}], function(err, result){

    if(err){
      return callback("-3")//服务器错误
    }
    if(result.length == 0){
      return callback("-1")//查无
    }
    else{
      let res = []
      let i = 0
      let j = 0
      while (result[i]){
        let arr = result[i]._id
        for(let k = 0; k< arr.length; k++) {
          if(res.indexOf(arr[k]) == -1)
          {
            res.push(arr[k])
          }
          j++
        }
        i++
      }
      return callback(res)
    }
  })
}


//获取当前分类下所有文章的标签
exports.getLabelByKind = function(params, callback) {
  db.distinct("Article",[{$match: {kind: params.kind}}, {$group: {_id: '$label'}}], function(err, result){

    if(err){
      return callback("-3")//服务器错误
    }
    if(result.length == 0){
      return callback("-1")//查无
    }
    else{
      let res = []
      let i = 0
      let j = 0
      while (result[i]){
        let arr = result[i]._id
        for(let k = 0; k< arr.length; k++) {
          if(res.indexOf(arr[k]) == -1)
          {
            res.push(arr[k])
          }
          j++
        }
        i++
      }
      return callback(res)
    }
  })
}




//在对应分类中获取带有指定标签的文章
exports.getArticleByLabel = function(params, callback) {
  let json = {'kind': params.kind}
  if(params.label !== null) {
    json = {'kind': params.kind, 'label': params.label}
  }
  db.find("Article", json, {sort:{'createTime': -1}, page: params.page, pageamount: 5}, function(err, result){

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
        res[i] = {
          id: result[i]._id,
          title: result[i].title,
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



//修改文章
exports.modifyArticle = function(params, callback) {
  db.find("Article",{'_id': { $ne:ObjectID(params.id)}, 'title': params.title},function(err, result){

    if(err){
      return callback("-3")//服务器错误
    }
    if(result.length == 0){
      db.updateMany("Article",{'_id': ObjectID(params.id)}, {$set: {'title': params.title, 'author': params.author, 'kind': params.kind,  'describe': params.describe,  'label': params.label,  'content': params.content }},function(err, result){
        if(err){
          return callback("-3")//服务器错误
        }
        if(result.length == 0){
          return callback("-1")//查无
        }
        else{
          return callback("1")//修改成功
        }
      })
    }
    else{
      return callback("-1")//存在同名文章
    }
  })

}