var blogList = new Vue({
    el:"#blog_list",
    data:{
        blogList:[]
    },
    computed:{

    },
    created:function () {
        axios({
            method:"get",
            url:"/queryAllBlog",
        }).then(function (resp) {
            console.log(resp);
            for (var i = 0;i< resp.data.data.length;i++) {
                resp.data.data[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
            }
            blogList.blogList = resp.data.data;
        }).catch(function (resp) {
            console.log("请求失败");
        })
    }
})