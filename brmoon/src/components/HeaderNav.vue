<template>
    <div class="headerNav">
        <ul>
            <router-link to="/" class="net_Name" tag="li">{{headName}}</router-link>
            <li class="rightNav" @click="login()">登录</li>
            <li class="rightNav" @click="showList()">目录</li>
            <li class="rightNav" @click="AddArticle()">发布</li>
            <router-link to="/Lizi" class="rightNav" v-show="isLizi" tag="li">哩子</router-link>
        </ul>
        <div class="loginbox" v-show="loginShow">
            <ul>
                <li>
                    <span>账号</span><input type="text" placeholder="输入登录哦哩子" v-model="userName">
                </li>
                <li>
                    <span>密码</span><input type="text" placeholder="密码" v-model="passWord">
                </li>
            </ul>
            <button class="loginto" @click="loginTo()" :disabled="isDis">登录</button>
        </div>
        <div v-show="addAArticle" class="add_arti">
            <p style="border-bottom:1px solid #ddd"><span>发布文章</span><span class="add_cancle">X</span></p>
            <span>标题</span>
            <input type="text" value="" v-model="Title">
            <p>内容</p>
            <textarea name="" id="" cols="30" rows="10" v-model="conrent"></textarea>
            <p class="add_push" @click="add_push()">发布</p>
        </div>
        <div class="shade" v-show="loginShow||addAArticle" @click="loginHide()"></div>
    </div>
</template>

<script>
    import {mapState,mapMutations} from "vuex"
    export default {
        name:'headerNav',
        data(){
            return{
                Title:'',
                conrent:'',
                addAArticle:false,
                isListShow:true,
                loginShow:false,
                isDis:false,
                isLizi:localStorage.getItem("isLizi")?localStorage.getItem("isLizi"):false,
                passWord:'',
                userName:'',
                headName:'碎月的个人网站',
                rightNav:[{
                    url:'http://localhost:8806//',
                    name:'哩子',
                    met:'Individual()'
                },{
                    url:'http://localhost:8806//list',
                    name:'目录',
                    met:'ToggleList()'
                }]
            }
        },
        methods:{
            ...mapMutations([
                "toggleList",
                "loginIn"
            ]),
            showList(){
                this.isListShow=!this.isListShow;
                this.toggleList(this.isListShow)
            },
            AddArticle(){
                this.addAArticle=true;
            },
            login(){
                this.loginShow=!this.loginShow;
            },
            loginHide(){
                this.loginShow=false;
                this.addAArticle=false;
            },
            loginTo(){
                if(this.userName==''||this.passWord==''){
                    this.isDis=true;
                    alert('用户名密码不能为空');
                    return false;
                // }else if(localStorage.getItem("hasLogin")=='1'){
                //     alert('请勿重新登陆');
                //     return false;
                }
                console.log(localStorage.getItem("hasLogin"));
                let parmar={};
                let info={};
                parmar.type=2;
                info.userName=this.userName;
                info.passWord=this.passWord;
                parmar.info=info;
                var postData=JSON.stringify(parmar);
                const _this=this;
                _this.loginShow=false;
                _this.$axios({
                    method: 'post',
                    url:'http://localhost:8806/postComment.php',
                    data: postData,
                    }).then(function(res){
                        if(res.data){
                            _this.haslogin='1';
                            _this.isLizi=true;
                            localStorage.setItem("isLizi",true);
                            _this.loginIn(_this.haslogin);
                            alert('登录成功');
                        }else{
                            alert('用户名或密码错误');
                        }
                        _this.isDis=false;
                    }).catch(function(res){
                        if(res.data){
                            alert('用户名或密码错误');
                        }
                        console.log("登陆失败");
                    })
            },
            add_push(){
                this.addAArticle=false;
                const _this=this;
                var parmar={};
                var info={};
                var text='';
                parmar.type="addArt";
                info.username='大黄';
                info.title=_this.Title;
                info.ArticleType=1;
                info.ArticleId=Math.floor(Math.random()*40)+1000;
                text=this.conrent.replace(/\'/g,"''");
                console.log(text);
                info.content=text;
                parmar.info=info;
                // var postData=_this.$qs.parse(parmar);
                var postData=JSON.stringify(parmar);
                
                console.log(postData);
                    // data:JSON.stringify(parmar),
                _this.$axios({
                    method: 'post',
                    url:'http://localhost:8806/postComment.php',
                    data: postData,
                    }).then(function(res){
                        console.log("发布成功");
                }).catch(function(res){
                    console.log("请求数据错误");
                })
            }
        },
        computed:{
            ...mapState([
                "hasLogin"
            ])
        }
    }
</script>

<style>
*{
    padding: 0;
    margin: 0;
}
.headerNav{
    width: 100%;
    height: 50px;
    background-color: #333;
    color: #fff;
    box-shadow:2px 2px 1px #ddd;
    line-height: 50px;
    min-width: 1046px;
    /* position: fixed; */
}
.headerNav ul{
    width:1046px;
    margin: 0 auto;
}
.headerNav li{
    list-style: none;
    display: inline-block;
    cursor: pointer;
}
.rightNav{
    float: right;
    margin-right: 3%;
}
.net_Name{
    font-size: 20px;
}
.loginbox{
    position: fixed;
    top: 30%;
    left: 40%;
    max-width: 600px;
    min-width: 300px;
    width: 30%;
    padding: 10px;
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    z-index: 10;
}
.loginbox ul{
      width: 100%;
    min-width: 300px;
}
.loginbox li{
    display: block;
}
.loginbox span{
    color: #333;
}
.loginto{
    width: 80px;
    height: 30px;
    background-color: dodgerblue;
    border: none;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
}
.loginto:hover{
    background-color:skyblue;
}
.loginbox input{
    margin-left: 10px;
    border: 1px solid #ddd;
    height: 28px;
    padding-left: 5px;
    border-radius: 5px;
    outline: none;
}
input::-webkit-input-placeholder{
    color:#ddd;
}
.add_arti{
    position: fixed;
    top: 30%;
    left: 25%;
    max-width: 600px;
    min-width: 400px;
    width: 50%;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    z-index: 10;
    color: #333;
}
.add_cancle{
    float: right;
}
.add_arti>input{
    border: 1px solid #aaa;
    border-radius: 5px;
    height: 25px;
    width: 80%;
}
.add_arti>textarea{
    width: 99%;
    resize: none;
    margin-top: 10px;
    display: inline-block;
}
.add_push{
    margin: 0 auto;
    display: block;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #ddd;
    color: #fff;
    background-color: #1688e8;
    cursor: pointer;
    line-height: 30px;
    text-align: center;
}
</style>
