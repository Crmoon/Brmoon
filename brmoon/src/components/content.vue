<template>
    <div class="content">
        <h3>{{content.title}}</h3>
        <span v-html="content.content1"></span>
        <comment></comment>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    import comment from './comment'
    export default {
        name:'Content',
        components:{
            comment,
        },
        data(){
            return{
                content:{
                    title:'好想吃麻辣烫（づ￣3￣）づ╭❤～',
                    content1:'从前有座山，山上有座庙，庙里有个小锦哩给大黄讲故事',
                }
            }
        },
        mounted(){
            console.log(this.content.title)
            const _this=this
            _this.$axios({
                methods:'GET',
                url:_this.Group.Url+'index.php?title=canvas绘制星级&type=article_content',
                scriptCharset: 'utf-8'
            }).then(function(res){
                _this.content.title=res.data.title;
                // _this.content.content1=res.data.content.replace(/\n/g, "<br/>");
                _this.content.content1=res.data.content;
                console.log(_this.content.content1);
            }).catch(function(res){
                _this.content.title=res;
                console.log(_this.content.title);
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
                    url:_this.Group.Url+'index.php?title='+_this.title+'&type=article_content',
                    scriptCharset: 'utf-8'
                }).then(function(res){

                    _this.content.title=res.data.title;
                    // _this.content.content1=res.data.content.replace(/\n/g, "<br/>");
                    _this.content.content1=res.data.content;
                }).catch(function(res){
                    _this.content.title=res;
                    console.log("请求数据错误");
                })
            }
        }
    }
</script>

<style>
*{
    padding: 0;
    margin: 0;
}
.content{
    width: 60%;
    box-shadow: 2px 2px 1px #ddd;
}
pre{
    padding: 10px;
    background-color: #333;
    display: inline-block;
    color: #fff;
    border-radius: 5px;
    width: 96%;
    word-wrap: break-word;
    word-break:break-all;
    white-space: pre-wrap;
    line-height: 20px;
}
</style>
