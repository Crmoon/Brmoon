<template>
    <div class="LeftNav">
        <ul v-show="leftListShow">
            <transition-group name="listName">
            <li v-for="(list,index) in rightList" :key="index">
                    <a href="javascript:void(0);" v-on:click="listToggle(index)">{{list.headName}}</a>
                <transition-group name="list" tag="ul">
                    <ul class="childlist" v-show="show==index" :key="index">
                        <li v-for="(childList,index) in list.childName" :key="index" :data-id="childList" v-on:click="loadArticlr(childList)">{{childList}}</li>
                    </ul>
                </transition-group>
            </li>
            </transition-group>
        </ul>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {
        name:'LeftNav',
        data(){
            return{
                show:-1,
                rightList:[{
                    headName:'前端杂记',
                    childName:[]
                },{
                    headName:'后端杂记',
                    childName:[]
                }]
            }
        },
        created:function(){
            const _this=this;
            _this.$axios({
                methods:'get',
                url:_this.Group.Url+'index.php?type=article_list',
                scriptCharset: 'utf-8'
            }).then(function(res){
                res.data.forEach(function(value,index){
                    if(value.ArticleType==1){
                        _this.rightList[0].childName.push(value.title);
                    }else if(value.ArticleType=2){
                        _this.rightList[1].childName.push(value.title);
                    }
                })
            }).catch(function(res){
                console.log("请求数据错误");
            })
        },
        computed:{
            ...mapState([
                'leftListShow'
            ]),
        },
        methods:{
            ...mapMutations([
                "selectArticle"
            ]),
            listToggle:function(index){
                if(this.show==index){
                    this.show=-1;
                }else{
                    this.show=index;
                }
            },
            loadArticlr(childList){
                this.selectArticle(childList);
            }
        }
    }
</script>

<style>
*{
    padding: 0;
    margin: 0;
}
.LeftNav{
    width: 20%;
    color: #333;
    vertical-align: middle;
    position: relative;
    /* position: fixed; */
}
.LeftNav>ul{
    position: absolute;;
    left: 50%;
}
a{
    font-family: "微软雅黑";
    color: #333;
    text-decoration: none;
    font-size: 13px;
}
.LeftNav li{
    list-style: none;
}
.childlist{
    margin-left: 10px;
    color: #888
}
.childlist li{
    text-align: left;
    cursor: pointer;
}
.childlist li:hover{
    color: aqua;
}

.list-leave-active{
    transition:all 1s ease;
}
.list-enter-active{
    transition: all 1s cubic-bezier(0,0.5,1,0.5);
}
.list-enter,.list-leave-to{
    opacity: 0;
    transform: translateX(3px);
}
.listName-move {
  transition: all 1s ease;
}
.list-leave-active {  
    position:absolute;  
}
</style>
