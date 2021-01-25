import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import ShoppingCart from './shoppingCart.vue'
import {BootstrapVue, BootstrapVueIcons, IconsPlugin} from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'


Vue.use(VueRouter)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue, BootstrapVueIcons, IconsPlugin)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home},
  { path: '/shoppingCart', component: ShoppingCart}
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')