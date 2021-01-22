var db = require('../MongoDB/connectDB')
var mongoose = require('mongoose')


exports.getLabelInfo = function(callback) {
  db.find("Label",{},function(err,result){

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
        res[result[i].content] = {
          'color': result[i].color,
          'backgroundColor': result[i].backgroundColor
        }
        i++
      }
      return callback(res)
    }
  })
}




exports.findLabelInfo = function(params ,callback) {
  db.find("Label",{'content': params.content},function(err,result){

    if(err){
      return callback("-3")//服务器错误
    }
    if(result.length == 0){
      return callback("-1")//查无
    }
    else{
      let res = []
      res.push({
        content: result[0].content,
        color: result[0].color,
        backgroundColor: result[0].backgroundColor
      })
      return callback(res)
    }
  })
}
