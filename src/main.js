import Vue from 'vue'
import  VueRouter from 'vue-router'
import App from './App'
import Goods from './components/goods/Goods.vue'
import Ratings from './components/ratings/Ratings.vue'
import Seller from './components/seller/Seller.vue'

Vue.use(VueRouter);

import  './assets/css/reset.css'
import './assets/css/style.css'

const router = new VueRouter({
  routes:[
    {path:"/goods",component:Goods},
    {path:"/ratings",component:Ratings},
    {path:"/seller",component:Seller},
    {path:"/",redirect:"/goods"}
  ]
});


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  data:{
    eventHub: new Vue()
  },
  template: '<App/>',
  components:{App},

});
