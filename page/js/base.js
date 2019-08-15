var randomTags = new Vue({
    el:"#random_tags",
    data:{
        tags:[]
    },
    computed:{
        randomColor:function () {
            return function () {
                var red = parseInt(Math.random() * 255);
                var green = parseInt(Math.random() * 255);
                var blue = parseInt(Math.random() * 255);
                return "rgb(" + red + "," + green + "," + blue + ")";

            }
        },
        randomSize:function () {
            return function () {
                var size = (Math.random() * 20 + 12) + "px";
                return size;
            }
        }
    },
    created:function () {
        axios({
            method:"get",
            url:"/queryRandomTags"
        }).then(function (resp) {
            var result = [];
            for(var i = 0 ; i < resp.data.data.length;i ++) {
                result.push({text:resp.data.data[i].tag,link:"/?tag=" + resp.data.data[i].tag});
            }
            randomTags.tags = result;
        }).catch(function (request) {
            console.log("请求错误");
        });
    }
})

var newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[]
    },
    created:function () {
        axios({
            method: "get",
            url:"/queryHotBlog?size=5"
        }).then(function (resp) {
            var result = [];
            for(var i = 0;i < resp.data.data.length;i ++) {
                var temp = {};
                temp.title = resp.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        }).catch(function (resp) {
            console.log("请求错误");
        })
    }
})

var newComments = new Vue({
    el:"#new_comments",
    data:{
        conmmentList:[]
    },
    created:function () {
        axios({
            method: "get",
            url:"/queryNewComments?size=5"
        }).then(function (resp) {

            var result = [];
            for(var i = 0;i < resp.data.data.length;i ++) {
                var temp = {};
                temp.name = resp.data.data[i].user_name;
                temp.date = resp.data.data[i].ctime;
                temp.comment = resp.data.data[i].comments;
                result.push(temp);
            }
            newComments.conmmentList = result;
        }).catch(function (resp) {
            console.log("请求错误");
        })
    }
})