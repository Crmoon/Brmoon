import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var storage=window.localStorage;
const store =new Vuex.Store({
    state:{
        leftListShow:true,
        title:"刀剑寒",
        ArticleId:null,
        hasLogin:storage.hasLogin=='1'?'1':'0',
        ablum_images:true,
    },
    mutations:{
        toggleList(state,isShow){
            state.leftListShow=isShow;
        },

        selectArticle(state,title){
            state.title=title;
            // state.ArticleId=id;
            console.log(state+title)
        },
        loginIn(state,loginShow){
            state.hasLogin='1';
            storage.hasLogin="1";
        },
        ablumToimages(state,ablumShow){
            state.ablum_images=ablumShow;
        }
    }
})
export default store;

