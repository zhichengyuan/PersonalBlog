var commentDao = require("../dao/CommentDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var captcha = require("svg-captcha");
var url = require("url");
var path = new Map();

//添加评论接口
function addComment(request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.insertComment(parseInt(params.bid),parseInt(params.parent),params.parentName,params.userName,params.email,params.content,timeUtil.getNow(),timeUtil.getNow(),function(result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","评论成功",null));
        response.end();
    });
}

path.set("/addComment",addComment);

//生成验证码
function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    response.writeHead(200);
    response.write(respUtil.writeResult("sccess","生成验证码成功",img));
    response.end();
}

path.set("/queryRandomCode",queryRandomCode);

//根据blogid查看评论
function queryCommentsByBlogId (request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsByBlogId(params.bid,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","查询成功",result));
        response.end();
    })
}

path.set("/queryCommentsByBlogId",queryCommentsByBlogId);

//查看blog的评论总数
function queryCommentsCountByBlogId (request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsCountByBlogId(params.bid,function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","查询成功",result));
        response.end();
    })
}

path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId);

//查看最新评论
function queryNewComments(request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.queryNewComments(parseInt(params.size),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","查询成功",result));
        response.end();
    })
}
path.set("/queryNewComments",queryNewComments);
module.exports.path = path;