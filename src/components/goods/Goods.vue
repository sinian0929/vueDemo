<template>
<div class="goods" v-if="seller!=null">
  <!--菜单列表-->
  <div class="menu-wrapper" v-if="goods"  ref="menuWrapper">
    <ul>
      <li class="menu-item" v-for="(item,index) in goods" :class="{'current': currentIndex === index}" @click="selectMenu(index,$event)">
        <span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper" >
    <ul>
      <li v-for="item in goods" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item border-1px"  @click="selectFood(food, $event)">
            <div class="icon">
              <img width="57" height="57" :src="food.icon" alt="">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span>
                <span>好评率{{food.rating}}%</span>

              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"  @increment="incrementTotal"></cartcontrol>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <shopcart  ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"> </shopcart>
  <food :food="selectedFood" ref="food"></food>
</div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import  food from '../food/food.vue';
  import axios from 'axios';
  export default{
    props:['seller'],
        data(){
          return {
            goods:[],
            listHeight:[],
            scrollY:0,
            selectedFood:{}

          }
        },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      let that = this;
      let url = "http://localhost:8080/api/goods";
      axios.get(url).then((data) => {
//        console.log(data.data.data);
        that.goods = data.data.data;
        that.$nextTick(() => {
          that._initScroll();
          that._calculateHeight();
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    computed:{
      currentIndex(){
        for(let i=0;i<this.listHeight.length;i++){
           let height1=this.listHeight[i];
           let height2=this.listHeight[i + 1];
           if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
             return i;
           }
        }
        return 0;
      },
      selectFoods(){
        let foods= [];
        this.goods.forEach((good)=>{
          good.foods.forEach((food)=>{
            if(food.count){
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      selectMenu(index,event){
        if(!event._constructed){
          return;
        }
        let foodList =this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
        let el =foodList[index];
        this.foodsScroll.scrollToElement(el,300);
//        console.log(index);
      },
      selectFood(food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      incrementTotal(target) {
        //体验优化，解决小球卡顿
        this.$nextTick(()=>{
          this.$refs.shopcart.drop(target);
        });

      },
          _initScroll(){
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
              click:true
            });
            this.foodsScroll= new BScroll(this.$refs.foodsWrapper,{
              click:true,
              probeType:3
            });
            this.foodsScroll.on('scroll',(pos)=>{
              this.scrollY=Math.abs(Math.round(pos.y));
            });
          },
      _calculateHeight(){
                let foodList =this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
                let height= 0;
                this.listHeight.push(height);
                for(let i=0;i<foodList.length;i++){
                  let item =foodList[i];
                  height +=item.clientHeight;
                  this.listHeight.push(height);
                }
          }

    },
    components:{
          shopcart,
        cartcontrol,
      food


    },
    events:{
          'cart.add'(target) {
            this._drop(target);
          }
    }
  }
</script>


<style>
.goods{
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
  .goods .menu-wrapper{
    width: 80px;
    flex: 0 0 80px;
    background: #f3f5f7;
  }
.goods .menu-wrapper .menu-item{
  display: table;
  height: 54px;
  width: 56px;
  line-height: 14px;
  padding: 0 12px;
}
.goods .menu-wrapper .menu-item .icon{
  display: inline-block;
  width: 12px;
  height: 12px;
  vertical-align: top;
  margin-right: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.goods .menu-wrapper .menu-item .icon.decrease {
  background-image: url('images/decrease_3@2x.png');
}
.goods .menu-wrapper .menu-item .icon.discount {
  background-image: url('images/discount_3@2x.png');
}
.goods .menu-wrapper .menu-item .icon.guarantee {
  background-image: url('images/guarantee_3@2x.png');
}
.goods .menu-wrapper .menu-item .icon.invoice {
  background-image: url('images/invoice_3@2x.png');
}
.goods .menu-wrapper .menu-item .icon.special {
  background-image: url('images/special_3@2x.png');
}
.goods .menu-wrapper .menu-item .text{
  display: table-cell;
  width: 56px;
  vertical-align:middle;
  font-size: 12px;
}
.border-1px{
  position: relative;
}
.border-1px:after{
  content: "";
  position:absolute;
  bottom:0;
  left: 0;
  right: 0;
  border-bottom:1px solid #dcdddf;
  -webkit-transform:scaleY(0.5);
  --webkit-transform-origin:0 0;
  overflow: hidden;
}
.goods .menu-wrapper .menu-item.current {
  position: relative;
  margin-top: -1px;
  z-index: 10;
  background: #fff;
  font-weight: 700;
}
.goods .foods-wrapper{
  flex: 1;
}
.goods .foods-wrapper .title{
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147,153,159);
  background: #f3f5f7;
}
.goods .foods-wrapper .food-item{
  display: flex;
  padding-bottom: 18px;
  margin: 18px;
}
.goods .foods-wrapper .food-item:last-child{
  margin-bottom: 0px;
}
.goods .foods-wrapper .food-item .icon{
 flex:0 0 57px;
  margin-right: 10px;

}
.goods .foods-wrapper .food-item .content{
  flex: 1;
}
.goods .foods-wrapper .food-item .content .name{
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7,17,27);
}
.goods .foods-wrapper .food-item .content .desc, .extra{

  line-height: 10px;
  font-size: 10px;
  color: rgb(147,153,159) ;
}
.goods .foods-wrapper .food-item .content .desc{
  margin-bottom: 8px;
  line-height: 12px;
}
.goods .foods-wrapper .food-item .content .extra{
}
.goods .foods-wrapper .food-item .content .count{
  margin-right: 12px;
}
.goods .foods-wrapper .food-item .content .price{
  font-weight: 700;
  line-height: 24px;
}
.goods .foods-wrapper .food-item .content .price .now{
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240,20,20);
}
.goods .foods-wrapper .food-item .content .price .old{
  text-decoration: line-through;
  font-size:10px;
  color: rgb(147,153,159) ;
}
.goods .foods-wrapper .food-item .content .cartcontrol-wrapper{
  position: absolute;
  right:0px;
  bottom: 12px;
}
</style>
