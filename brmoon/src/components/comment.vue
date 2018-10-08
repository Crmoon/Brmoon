<template>
    <div class="comment">
        <div class="comment_title">
            <span>用户评论</span>
            <span class="request" @click="request_show()">回复</span>
        </div>
        <div class="comment_content" v-for="(infor,index) in comments" :key="index">
            <img src="../assets/logo.png" alt="">
            <p class="comment_box">
                <a class="comment_top">{{infor.userName}}<span>{{infor.creatTime}}</span></a>
                <span class="comment_bottom">{{infor.content}}</span>
            </p>
        </div>
        <div v-show="request" class="request_body">
            <p><span>回复</span><span class="request_cencle" @click="request_hide()">X</span></p>
            <textarea name="" id="" cols="30" rows="10" v-model="comment_content"></textarea>
            <button @click="request_toPHP()">发布</button>
        </div>
        <div v-show="request" class="shade" @click="request_hide()"></div>
    </div>
</template>
<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {
        name:'comment',
        data() {
            return {
                request:false,
                comment_content:'',
                comments:[{
                    userName:'管理员',
                    creatTime:'2018-7-5 15:01:25',
                    content:'这篇文章还不错哦',
                    headImg:'../assets/logo.png'
                },{
                    userName:'哩子',
                    creatTime:'2018-8-8 15:01:25',
                    content:'文章好看但是没有麻辣烫好吃',
                    headImg:'../assets/logo.png'
                }]
            }
        },
        mounted(){
            const _this=this;
            _this.$axios({
                methods:'GET',
                url:_this.Group.Url+'index.php?title=刀剑寒&type=article_comment',
                    scriptCharset: 'utf-8'
                }).then(function(res){
                    _this.comments=res.data;
                    console.log(_this.comments)
                }).catch(function(res){
                    console.log("请求数据错误");
                })
//             var ajax = new XMLHttpRequest();
//             ajax.open('get','http://localhost:7803/addTitle');
//             ajax.send();
//             ajax.onreadystatechange = function () {
//             if (ajax.readyState==4 &&ajax.status==200) {
//             　　　　console.log(ajax.responseText);//输入相应的内容
//   　　}
// }
        },
        methods:{
            request_show:function(){
                this.request=true;
            },
            request_hide:function(){
                this.request=false;
            },
            request_toPHP:function(){
                if(localStorage.getItem("hasLogin")!='1'){
                    alert('未登录不可以评论哦,如果是哩子的话请点击登陆');
                    return false;
                }
                this.request=false;
                const _this=this;
                var parmar={};
                var info={}
                parmar.type=1;
                info.content=this.comment_content;
                info.userName='哩子';
                info.userId='321';
                info.title=_this.title;
                parmar.info=info;
                // var postData=_this.$qs.parse(parmar);
                var postData=JSON.stringify(parmar);
                
                console.log(postData);
                    // data:JSON.stringify(parmar),
                _this.$axios({
                    method: 'post',
                    url:_this.Group.Url+'postComment.php',
                    data: postData,
                    }).then(function(res){
                    _this.$axios({
                        methods:'GET',
                        url:_this.Group.Url+'index.php?title='+_this.title+'&type=article_comment',
                        scriptCharset: 'utf-8'
                    }).then(function(res){
                        _this.comments=res.data;
                        console.log(_this.comments)
                    }).catch(function(res){
                        console.log("请求数据错误");
                    })
                }).catch(function(res){
                    console.log("请求数据错误");
                })
            }
        },
        computed:{
            ...mapState([
                'title'
            ]),
        },
        watch:{
            title(){
                const _this=this
                _this.$axios({
                    methods:'GET',
                    url:_this.Group.Url+'index.php?title='+_this.title+'&type=article_comment',
                    scriptCharset: 'utf-8'
                }).then(function(res){
                    _this.comments=res.data;
                    console.log(_this.comments)
                }).catch(function(res){
                    console.log("请求数据错误");
                })
            }
        }
    }
</script>

<style>
.comment{
    margin-top: 20px;
    padding: 5px 30px;
    border: 1px solid #eee;
}
.comment_content img{
    height: 25px;
    width:25px;
    border:2px solid #1688e8;
    border-radius: 50%;
}
.comment_content{
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
}
.comment_title{
    margin: 10px 0px;
}
.comment_box{
    margin-left: 40px;
    margin-top: -28px;
}
.comment_top{
    display: block;
    margin-bottom: 10px;
}
.comment_top span{
    float: right;
}
.request{
    cursor: pointer;
}
.request_cencle{
    float: right;
    cursor: pointer;
}
.request_body{
    position: fixed;
    top: 30%;
    max-width: 600px;
    min-width: 400px;
    width: 50%;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    z-index: 10;
}
.request_body textarea{
    width: 99%;
    resize: none;
    margin-top: 20px;
    display: inline-block;
}
.request_body button{
    margin: 0 auto;
    display: block;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ddd;
    color: #fff;
    background-color: #1688e8;
    cursor: pointer;
}
.shade{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #333;
    opacity:0.3;
}
</style>
