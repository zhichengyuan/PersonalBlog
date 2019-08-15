var dbutil = require("./dbutil");

//插入评论
function insertComment(blogId,parent,parentName,userName,email,comments,ctime,utime,success) {
    var insertSql = "insert into comments (`blog_id`,`parent`,`parent_name`,`user_name`,`email`,`comments`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?);";
    var params = [blogId,parent,parentName,userName,email,comments,ctime,utime,];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

//根据blogid查看评论
function queryCommentsByBlogId(blogId,success) {
    var insertSql = "select * from comments where blog_id = ?;";
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

//根据blogid查看评论总数
function queryCommentsCountByBlogId(blogId,success) {
    var insertSql = "select count(1) as count from comments where blog_id = ?;";
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

//查看最新评论
function queryNewComments(size,success) {
    var insertSql = "select * from comments order by id desc limit ?;";
    var params = [size];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}
module.exports ={
    "insertComment":insertComment,
    "queryCommentsByBlogId":queryCommentsByBlogId,
    "queryCommentsCountByBlogId":queryCommentsCountByBlogId,
    "queryNewComments":queryNewComments
}