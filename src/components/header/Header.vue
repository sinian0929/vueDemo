<template>
    <div class="header">
        <!--头部左右内容-->
        <div class="header-content"  v-if="seller">
          <div class="header-content-left" >
            <img :src="seller.avatar" alt="">
          </div>
          <div class="header-content-right">
            <div class="right-content">
              <span class="brand"></span><span class="brand-name">{{seller.name}}</span>
              <div class="description">{{seller.description}} <i>/</i> {{seller.deliveryTime}}分钟送达</div>
              <div class="decrease"><span class="decrease-jian"></span><span class="decrease-jian-content">{{seller.supports[0].description}} , 满50减10</span></div>
            </div>
          </div>
          <!--右边按钮-->
          <div class="button-res" @click="popupBtn">
            <span>{{seller.supports.length}}个</span><span class="icon-keyboard_arrow_right"></span>
          </div>
        </div>
        <!--公告-->
        <div class="pub" v-if="seller"  @click="popupBtn">
        <span class="pub-pic"></span><span class="pub-content">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
      </div>
        <!--背景图-->
        <div class="background" v-if="seller">
        <img :src="seller.avatar" width="100%" height="100%" alt="">
      </div>
         <!--弹出遮罩层-->
        <div class="popup" v-show="popupShow" v-if="seller">
          <div class="popup-wrapper clearfix">
          <div class="popup-main">
          <div class="popup-title">
            <span class="popup-title-content">{{seller.name}}</span>
          </div>
          <!--星级-->
          <!--<div class="star-level">-->
            <!--<mystar :msg="seller.score" :pattern="1"></mystar>-->
          <!--</div>-->
            <div class="star-level">
              <star :size="48" :score="seller.score"></star>
            </div>
          <!--优惠信息-->
          <div class="discount">
            <div class="line"></div>
            <div class="discount-text">优惠信息</div>
            <div class="line"></div>
          </div>
          <!--优惠内容信息-->
          <ul class="supports" v-if="seller.supports">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <span class="icon decrease" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{ seller.supports[index].description }}</span>
            </li>
          </ul>

          <!--优惠信息-->
          <div class="discount">
            <div class="line"></div>
            <div class="discount-text">商家公告</div>
            <div class="line"></div>
          </div>
          <!--公告内容-->
          <div class="bulletin">
            <p class="bulletin-content">{{seller.bulletin}}</p>
            <p class="bulletin-content">{{seller.bulletin}}</p>
            <p class="bulletin-content">{{seller.bulletin}}</p>
          </div>
          </div>
          <!--关闭按钮-->
           <div class="popup-close" @click="popupHide">
             <span class="icon-close"></span>
           </div>
        </div>
        </div>
    </div>
</template>

<script>
  import Alltar from '../star/Star.vue';


  export default {
    props:['seller'],
    data() {

      return {
        supports:[],
        popupShow: false
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    methods:{
      popupBtn(){
        this.popupShow=true;
      },
      popupHide(){
        this.popupShow=false;
      }
    },
    components: {
      star:Alltar

    }
  }
</script>


<style>
   .header{
     height: 130px;
     background: rgba(7, 17, 27, 0.5);
   }
   .header .header-content{
     width: 100%;
     height: 106px;

   }
   .header .header-content .header-content-left{
    position: absolute;
     left: 24px;
     top: 24px;


   }
   .header .header-content .header-content-left img{
     width: 65px;
     height:65px;
     border-radius: 2px;
   }
   .header .header-content .header-content-right{
     width: 213px;
     height:65px;

     margin-left: 105px;
     position: absolute;
     top: 24px;

   }
   .header .header-content .header-content-right .right-content .brand{
     display: inline-block;
     width: 30px;
     height:19px;
     background: url("images/brand@2x.png");
     background-size:30px 19px;
     float: left;
   }
   .header .header-content .header-content-right .right-content .brand-name{
     display: inline-block;
     font-size: 16px;
     color: #fff;
     font-weight: 800;
     margin-left:7px;
   }
   .header .header-content .header-content-right .right-content .description{
     color:white;
     position: absolute;
     left: 0px;
     font-size: 12px;
     font-weight: 200;
     margin-top: 9px;
   }
   .header .header-content .header-content-right .right-content .decrease{
     width: 100%;
     position: absolute;
     left: 0px;
     bottom: 4px;
   }
   .header .header-content .header-content-right .right-content .decrease .decrease-jian{
     display: inline-block;
     width: 13px;
     height:13px;
     background: url("images/decrease_1@2x.png");
     background-size: 13px 13px;
     float: left;

   }
   .header .header-content .header-content-right .right-content .decrease .decrease-jian-content{
     color:white;
     font-size: 10px;
     font-weight: 200;
     display: inline-block;
     margin-left: 4px;
     position: absolute;
     margin-top: 2px;
   }
   .header .header-content .button-res{
     width: 44px;
     height:25px;
     border-radius: 20px;
     background-color: rgba(0,0,0,0.2);

     position: absolute;
     right: 12px;
     margin-top: 68px;
     text-align: center;
     font-size: 10px;
     color: white;
     font-weight: 200;
     line-height: 28px;
   }
   .background{
     position: absolute;
     left: 0;
     top: 0;
     width: 100%;
     height: 107px;
     z-index: -2;
     filter: blur(10px);
   }
   .header .pub{
     position: relative;
     height: 26px;
     line-height: 28px;
     padding: 0 22px 0 12px;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
     color: #fff;
     background: rgba(7, 17, 27, .2);

   }
   .header .pub .pub-pic{
     display: inline-block;
     vertical-align: top;
     margin-top: 8px;
     width: 22px;
     height: 12px;
     background: url("images/bulletin@2x.png");
     background-size: 22px 12px;
     background-repeat: no-repeat;
  }
   .header .pub .pub-content{
     vertical-align: top;
     margin: 0 4px;
     font-size: 10px;
   }
   .header .pub .icon-keyboard_arrow_right {
     position: absolute;
     font-size: 10px;
     right: 12px;
     top: 8px;
   }
   .popup{
     position: fixed;
     top: 0;
     left: 0;
     z-index: 100;
     width: 100%;
     height: 100%;
     background: rgba(7, 17, 27, 0.8);
     backdrop-filter: blur(10px);
     text-align: center;
     overflow: auto;
     color: white;
   }
   .popup .popup-wrapper{
     width: 100%;
     min-height: 100%;
   }
   .popup .popup-main{
     margin-top: 64px;
     padding-bottom: 64px;
   }
   .popup .popup-close{
     position: relative;
     width: 32px;
     height: 32px;
     color: #fff;
     font-size: 32px;
     margin: -50px auto 0 auto;
     clear: both;

   }
   .popup .popup-close  span{
     color:rgba(255,255,255,0.5);
     font-size: 32px;

   }
   .popup .popup-main .popup-title{
     line-height: 16px;
   }
   .popup .popup-title .popup-title-content{
     font-size: 16px;
     font-weight: 700;
     color: white;
   }
   .popup .star-level{
     margin-top: 18px;
     margin-bottom: 28px;
     text-align: center;
   }
   .popup .discount{
     display: flex;
     width: 80%;
     margin: 0 auto;
   }
   .popup .line{
     flex: 1;
     position: relative;
     top: -6px;
     border-bottom: 1px solid rgba(255,255,255,0.2);
   }
   .popup .discount-text{
     padding: 0 12px;
     font-weight: 700;
     font-size: 14px;
     color: white;
   }
   .popup .supports{
      width: 80%;
     margin: 0 auto;
     /*margin-top: 24px;*/
     /*margin-bottom: 28px;*/
     margin: 24px 28px;
   }
   .popup .supports .support-item{
     padding: 0 12px;
     margin-bottom: 12px;
     font-size: 0;
     text-align: left;
   }
   .popup .supports .support-item:last-child{
     margin-bottom: 0;
   }
   .popup .supports .support-item .icon{
     display: inline-block;
     width: 16px;
     height: 16px;
     vertical-align: top;
     margin-right: 6px;
     background-size: 16px 16px;
     background-repeat: no-repeat;
   }
   .popup .supports .support-item .icon.decrease {
     background-image: url('images/decrease_2@2x.png');
    }
   .popup .supports .support-item .icon.discount {
     background-image: url('images/discount_2@2x.png');
    }
   .popup .supports .support-item .icon.guarantee {
     background-image: url('images/guarantee_2@2x.png');
    }
   .popup .supports .support-item .icon.invoice {
     background-image: url('images/invoice_2@2x.png');
    }
   .popup .supports .support-item .icon.special {
     background-image: url('images/special_2@2x.png');
    }

   .popup .supports .support-item .text{
     font-size: 12px;
     line-height: 16px;
   }
  .bulletin{
    width: 80%;
    margin: 0 auto;
    margin-top: 24px;
  }
   .bulletin  .bulletin-content{
     padding: 0 12px;
     line-height: 24px;
     font-size: 12px;
     font-weight: 200;
     text-align: left;
   }
</style>
