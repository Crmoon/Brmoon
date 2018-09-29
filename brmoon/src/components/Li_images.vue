<template>
    <div class="Li_images_index">
        <div class="Li_images">
            <div class="Li_images_nav">
                <ul>
                    <li @click="showAblum()">
                        <router-link to="/Lizi/Li_images/images" tag="a" class="Li_nav_a">相册</router-link>
                    </li>
                    <li>
                        <router-link to="/Lizi/Li_images/videos" tag="a" class="Li_nav_a">视频</router-link>
                    </li>
                </ul>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Li_images',
  data(){
      return{

      }
  },
  methods:{
        ...mapMutations([
            "ablumToimages"
        ]),
        showAblum:function(){
            this.ablumToimages(true);
        }
  }
}
</script>

<style scoped>
.Li_images_index{
    padding: 20px 20px 0 20px;
}
.Li_images{
    width: 100%;
    padding: 0 58px;
    background-color: #f2f2f2;
    box-sizing:border-box; 
}
.Li_images_nav{
    height: 55px;
    line-height: 55px;
    border-style: none none solid none;
    border-color: #d9d9d9;
}
.Li_images_nav ul li{
    display: inline-block;
}
.Li_images_nav ul li:hover{
    border-bottom: 1px solid #333;
}
.Li_nav_a{
    padding: 0 13px;
    text-decoration: none;
    color:#333;
    opacity: .8;
    display: inline-block;
    height: 100%;
}
.Li_nav_a:hover{
    opacity: 1;
}
</style>
