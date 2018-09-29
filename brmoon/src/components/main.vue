<template>
    <div>
        <div id="main">
            <left-list></left-list>
            <Content></Content>
        </div>
    </div>
</template>

<script>
import LeftList from "./Directories"
import Content from "./content"
export default {
  name: 'Main',
  components:{
    LeftList,
    Content
  }
}
</script>

<style>
#main{
  display: flex;
  max-width: 1300px;
  min-width: 800px;
  margin: 0 auto;
  background: url(../assets/background.jpeg);
}
li{
    list-style: none;
}
</style>
