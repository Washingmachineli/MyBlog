let db = require('../MongoDB/connectDB')
let mongoose = require('mongoose')
let ObjectID = require('mongodb').ObjectID;
let ReplaceString = require('./replaceString')

exports.addComment = function(params, callback) {
    let commentator = ReplaceString.replaceStr(params.commentator);
    let comment = params.comment
    let article = params.article

    db.insertOne("Comment",{
        "commentator" : commentator,
        "comment" : comment,
        "article" : article,
        "commentTime" : (new Date()).valueOf(),
    },function(err,result){
        if(err){
            return callback("-3");//服务器错误
        }
        return callback("1");//注册成功
    });
}

exports.getComment = function(params, callback) {
    let article = params.article

    db.getAllCount("Comment", {'article': article}, function (err, result) {

        if (err) {
            return callback("-3")//服务器错误
        } else {
            let length = result;
            db.find("Comment",{'article': article},{sort:{'commentTime': -1}, page: params.page, pageamount: 5}, function(err, result){

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
                        res['data'][result[i]._id] = {
                            commentator: result[i].commentator,
                            comment: result[i].comment,
                            article: result[i].article,
                            commentTime: result[i].commentTime,
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