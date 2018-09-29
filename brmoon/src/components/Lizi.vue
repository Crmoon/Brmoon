<template>
  <div class="li_back">
    <div class="li_content">
      <div class="headNav">
        <h1><span class="Li_userName">可爱的哩子</span></h1>
        <div class="Li_head_nav">
          <div class="Li_head_outer">
            <img class="Li_head" src="../assets/Li_head.jpg" alt="">
          </div>
          <ul class="Li_head_tab">
            <li><router-link to="/Lizi/Li_index" tag="a" exact>主页</router-link></li>
            <li><router-link to="/Lizi/Li_images" tag="a">相册</router-link></li>
          </ul>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Lizi',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.li_back{
  width: 100%;
  min-width: 1046px;
  /* background-image: -webkit-cross-fade(url("../assets/Li_background.jpg"),url("../assets/Li_shade.png"), 50%);
  background-image: -webkit-cross-fade(url('../assets/Li_background.jpg'), url('../assets/Li_shade.png'), 50%); */
  background:url(../assets/Li_shade.png),url(../assets/Li_background.jpg);
  background-size: 100% 100%;;
  height: 400px;
  background-color: #ddd;
}
.headNav{
  width: 1046px;
  margin: 0 auto;
  height: 284px;
  position: relative;
}
.li_content{
  min-width: 1046px;
  /* margin: 0 auto; */
}
.Li_userName{
    text-shadow: 1px 1px 1px rgba(0,0,0,.2);
    display: inline-block;
    margin-top: 20px;
}
h1{
  color:#295c9d;
}
.Li_head_nav{
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  width: 100%
}
.Li_head_outer{
  height: 126px;
  width:126px;
  border: #ddd 1px solid;
}
.Li_head{
  height: 126px;
  width:126px;
  border: #fff 3px solid;
  box-sizing: border-box;
}
.Li_head_tab{
  position: absolute;
  top: 80px;
  left: 150px;
}
.Li_head_tab li{
  list-style: none;
  display: inline-block;
  height: 50px;
}
.Li_head_tab li a{
    display: inline-block;
    border-bottom-color: transparent;
    border-bottom-style: solid;
    border-bottom-width: 3px;
    height: 47px;
    line-height: 47px;
    padding: 0 15px;
    font-family: "微软雅黑";
    color: #333;
    text-decoration: none;
    font-size: 15px;
}
.Li_head_tab li a:hover{
  cursor: pointer;
  text-decoration:underline;
}

</style>
