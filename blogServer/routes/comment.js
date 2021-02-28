let express = require('express');
let router = express.Router();
let comment = require('../Modules/comment')


//回复评论
router.post('/replyComment', function(req, res, next) {
    let params = req.body;
    comment.replyComment(params,data => {
        res.send(data);
    })
});


//删除回复
router.post('/replyDelete', function(req, res, next) {
    let params = req.body;
    comment.replyDelete(params,data => {
        res.send(data);
    })
});


//删除评论
router.post('/commentDelete', function(req, res, next) {
    let params = req.body;
    comment.commentDelete(params,data => {
        res.send(data);
    })
});

module.exports = router