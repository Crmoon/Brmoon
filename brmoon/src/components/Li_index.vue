<template>
    <div class="Li_main">
        <div class="Li_main_left">
            <ul>
                <li><a><i class="fa fa-heart" aria-hidden="true" style="color:red"></i>哩子的心情</a></li>
                <li><a>大黄的沙发</a></li>
            </ul>
        </div>
        <div class="Li_main_content">
            <textarea class="AddHeard" cols="30" rows="5" placeholder="输入你的心情..." @focus="Addbutton=true" v-model="AddHeard"></textarea>
            <button class="addbutton" v-show="Addbutton" @click="AddLiHeard()">发布</button>
            <div class="Li_heard">     
                <div class="heard_content" v-for="(infor,index) in Heard" :key="index">
                    <img src="../assets/Li_head.jpg" alt="">
                    <p class="heard_box">
                        <a class="heard_top">哩子<span>{{infor.createTime}}</span></a>
                        <span class="heard_bottom">{{infor.heard}}</span><span class="todelete" @click="toDelete(infor.id)" :data-id="infor.id">[删除心情]</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Li_index',
    data(){
        return{
            Addbutton:false,
            AddHeard:'',
            Heard:[]

        }
    },
    mounted(){
        const _this=this;
        _this.$axios({
            methods:'GET',
            url:_this.Group.Url+'index.php?type=Li_Heard',
                scriptCharset: 'utf-8'
            }).then(function(res){
                 _this.Heard=res.data;
                console.log(_this.Heard)
            }).catch(function(res){
                console.log("请求数据错误");
            })
            // var ajax = new XMLHttpRequest();
            // ajax.open('get','http://localhost:7803/addTitle');
            // ajax.send();
            // ajax.onreadystatechange = function () {
            // if (ajax.readyState==4 &&ajax.status==200) {
            // 　　　　console.log(ajax.responseText);//输入相应的内容
//   　　}
// }
    },
    methods:{
        AddLiHeard:function(){
            if(localStorage.getItem("hasLogin")!='1'){
                alert('未登录不可以评论哦,如果是哩子的话请点击登陆');
                return false;
            }
            this.request=false;
            const _this=this;
            var parmar={};
            var info={}
            parmar.type=3;
            info.Heard=this.AddHeard;
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
                    _this.AddHeard='';
                    _this.$axios({
                    methods:'GET',
                    url:_this.Group.Url+'index.php?type=Li_Heard',
                        scriptCharset: 'utf-8'
                    }).then(function(res){
                        _this.Heard=res.data;
                        console.log(_this.Heard)
                    }).catch(function(res){
                        console.log("请求数据错误");
                    })
                }).catch(function(res){
                    console.log("请求数据错误");
                })
        },
        toDelete:function(id){
            if(confirm("确认要删除该心情吗")){
                const _this=this;
                var parmar={};
                var info={}
                parmar.type=4;
                info.id=id;
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
                        url:_this.Group.Url+'index.php?type=Li_Heard',
                            scriptCharset: 'utf-8'
                        }).then(function(res){
                            _this.Heard=res.data;
                            console.log(_this.Heard)
                        }).catch(function(res){
                            console.log("请求数据错误");
                        })
                    }).catch(function(res){
                        console.log("请求数据错误");
                    })
                }
        }
    }
}
</script>

<style>
.Li_main{
  width: 1046px;
  padding-top: 20px;
  margin: 0 auto;
}
.Li_main_left{
    width: 130px;
    font-size:13px;
    background-color: #fff;
    border-radius: 3px;
    border: 1px #e6e6e6 solid;
    display: inline-block;
    text-align: center;
}
.Li_main_left ul{
    box-shadow: 1px 1px 1px 0.2;
}
.Li_main_left li:hover{
    background-color: #ddd
}
.Li_main_left li a{
    padding: 8px 3px;
    display: block;
    cursor: pointer;
}
.Li_main_content{
    display: inline-block;
    width: 868px;
    vertical-align: top;
}
.AddHeard{
    resize: none;
    height: 80px;
    width: 95%;
    padding: 3px;
    border-radius: 3px;
    border: #ddd 1px solid;
}
.addbutton{
    display: block;
    height: 30px;
    width: 80px;
    border-radius: 5px;
    background-color: #1688e8;
    color: #fff;
    border: none;
    margin-left: 85%;
    margin-bottom: 5px;
    cursor: pointer;
}
.addbutton:hover{
    opacity: 0.5;
}

.heard_content img{
    height: 25px;
    width:25px;
    border:2px solid #1688e8;
    border-radius: 50%;
}
.heard_content{
    border-bottom: 1px solid #ddd;
    padding: 10px;
    font-size: 13px;
    margin: 25px 0;
    box-shadow: 1px 1px 1px #ddd;
}
.heard_title{
    margin: 10px 0px;
}
.heard_box{
    margin-left: 40px;
    margin-top: -28px;
}
.heard_top{
    display: block;
    margin-bottom: 10px;
}
.heard_top span{
    float: right;
}
.heard_bottom{
    color: #888;
}
.Li_heard{
    text-align: left;
    width: 95%;
}
.todelete{
    position: relative;
    color: #d8d8d8;
    font-size: 11px;
    cursor: pointer;
    float: right;
}
</style>
