<template>
  <div id="app">
<my-header :seller="seller"></my-header>
    <div class="tabs">
    <div class="tab-item">
     <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评价</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/seller">商家</router-link>
    </div>

    </div>
    <div class="content">
      <router-view :seller="seller"></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/header/Header.vue';
  import axios from 'axios';
  export default {
  name: 'app',
  components: {
      myHeader:Header
  },
    data(){
    return {
        seller:null


     }
    },
    created(){
       let that =this;
      //获取home页面需要的数据
       let url="http://localhost:8080/api/seller";
      axios.get(url).then((data)=>{
//        console.log(data.data.data);
        that.seller=data.data.data;
      }).catch((err)=>{
        console.log(err);
      });
    }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
  .tabs{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .tabs .tab-item{
    flex:1;
    text-align: center;
  }
  .tabs .router-link-active{
    color: red;
  }

</style>
