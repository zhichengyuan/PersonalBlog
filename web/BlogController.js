var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var path = new Map();

function queryHotBlog(request,response) {
    var params = url.parse(request.url,true).query;
    blogDao.queryHotBlog(parseInt(params.size),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","查询成功",result));
        response.end();
    })
}

path.set("/queryHotBlog",queryHotBlog);

//点击查看次数加一
function addViews(request,response) {
    blogDao.addViews(function (result) {})
}

//查看所有blog
function queryAllBlog(resqust,response) {
    blogDao.queryAllBlog(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","查询成功",result));
        response.end();
    })
}
path.set("/queryAllBlog",queryAllBlog);

//根据博客blogid查看博客
function queryBlogById(resqust,response) {
    var params = url.parse(resqust.url,true).query;

    blogDao.queryBlogById(parseInt(params.bid),function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","查询成功",result));
        response.end();
        blogDao.addViews(parseInt(params.bid),function (result) {
            console.log('加一');
        })
    })
}

path.set("/queryBlogById",queryBlogById);

//查看博客总数
function queryBlogCount(resqust,response) {
    blogDao.queryBlogCount(function (result) {
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","查询成功",result));
        response.end();
    })
}

path.set("/queryBlogCount",queryBlogCount);

//分页查看博客
function queryBlogByPage(resqust,response) {
    var params = url.parse(resqust.url,true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function (result) {

        for(var i = 0;i < result.length;i++) {
            result[i].content = result[i].content.replace(/<img[\w\W]*">/,"");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g,"");
            result[i].content = result[i].content.substring(0,300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("sccess","查询成功",result));
        response.end();
    })
}

path.set("/queryBlogByPage",queryBlogByPage);

//添加blog
function editBlog(resqust,response) {
    var params = url.parse(resqust.url,true).query;
    var tags = params.tags.replace(/ /g, "").replace("，",",");
    resqust.on("data",function (data) {
        blogDao.insertBlog(params.title,data.toString(),tags,0,timeUtil.getNow(),timeUtil.getNow(),function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for(var i = 0;i < tagList.length;i++) {
                if(tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        })
    });
}
path.set("/editBlog",editBlog);

//添加标签
function queryTag(tag,blogId) {
    tagsDao.queryTag(tag,function (result) {
        if(result == null || result.length == 0) {
            insertTag(tag,blogId);
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id,blogId,timeUtil.getNow(),timeUtil.getNow(),function (result) {

            });
        }
    });
}

//添加blog和tags的关联关系
function insertTag(tag,blogId) {
    tagsDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),function(result) {
        insertTagBlogMapping(result.insertId,blogId);
    });
}

function insertTagBlogMapping(tagId,blogId) {
    tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function (result) {

    });
}

module.exports.path = path;