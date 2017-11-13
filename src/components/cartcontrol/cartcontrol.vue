<template>
     <div class="cartcontrol">
       <transition name="move">
       <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
         <span class="inner  icon-remove_circle_outline"></span>
       </div>
       </transition>
       <div class="cart-count" v-show="food.count>0" >{{food.count}}</div>
       <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
     </div>
</template>

<script>
  import Vue from  'vue';
    export default {
      props:{
        food:{
          type:Object
        }
      },
      created(){
//        console.log(this.food);
      },
      methods:{
        addCart(event){
          if(!event._constructed){
            return;
          }
//          console.log("点击");
          if(!this.food.count){
            Vue.set(this.food,'count',1);//借助vue的接口set
          }else {
            this.food.count++;
          }
          this.$emit('increment', event.target);
        },
        decreaseCart(event){
          if(!event._constructed){
            return;
          }
          if (this.food.count) {
            this.food.count--;
          }
        }
      }
    }
</script>


<style>
  .cartcontrol{
    font-size: 0px;
  }
  .cartcontrol .cart-decrease{
   display: inline-block;
    padding: 6px;
  }
  .cartcontrol .cart-decrease .inner{
    display: inline-block;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0,160,220);
  }
  .cartcontrol .cart-decrease.move-enter-active,
  .cartcontrol .cart-decrease.move-leave-active{
    transition: all .5s;
    transform: translate3d(0, 0, 0);
  }
  .cartcontrol .cart-decrease.move-enter-active,
  .cartcontrol .cart-decrease.move-leave-active .inner{
    transition: all .5s;
    transform: rotate(0deg);
  }
  .cartcontrol .cart-decrease.move-enter,
  .cartcontrol .cart-decrease.move-leave-active{
    opacity: 0;
    transform: translate3d(24px, 0, 0);
  }
  .cartcontrol .cart-decrease.move-enter,
  .cartcontrol .cart-decrease.move-leave-active .inner{
    transform: rotate(180deg);
  }
  .cartcontrol .cart-count{
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147,153,159);
  }
  .cartcontrol .cart-add{
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0,160,220);
  }
</style>
