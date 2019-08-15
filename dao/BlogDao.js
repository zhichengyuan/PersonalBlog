var dbutil = require("./dbutil");

//点击查看次数加一
function addViews(blogId,success) {
    var updateSql = "update blog set views = views + 1 where id = ?;";
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

//查看所有blog列表
function queryAllBlog(success) {
    var querySql = "select * from blog order by id desc;";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

//插入博客
function insertBlog(title,content,tags,views,ctime,utime,success) {
    var insertSql = "insert into blog (`title`,`content`,`tags`,`views`,`ctime`,`utime`) values (?,?,?,?,?,?);";
    var params = [title,content,tags,views,ctime,utime];

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

//查看博客分页
function queryBlogByPage(page,pageSize,success) {
    var querySql = "select * from blog order by id desc limit ?,?;";
    var params = [page * pageSize,pageSize];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

//查看blog总数
function queryBlogCount(success) {
    var querySql = "select count(1) as count from blog;";
    var params = [];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

//根据blogid查看博客
function queryBlogById(blogId,success) {
    var querySql = "select * from blog where id = ?;";
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

//查看最热博客
function queryHotBlog(size,success) {
    var querySql = "select * from blog order by views desc limit ?;";
    var params = [size];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null) {
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

module.exports ={
    "insertBlog":insertBlog,
    "queryBlogByPage":queryBlogByPage,
    "queryBlogCount":queryBlogCount,
    "queryBlogById":queryBlogById,
    "queryAllBlog":queryAllBlog,
    "addViews":addViews,
    "queryHotBlog":queryHotBlog
}