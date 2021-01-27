import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import productos from './Productos.vue'
import {BIcon, BootstrapVue, BootstrapVueIcons, IconsPlugin} from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueRouter from 'vue-router'
import navBar from './components/navBar.vue'
import carrousel from './components/carrousel.vue'
import sections from './sections/Index.vue'
import Practicocina from './sections/sections/Practicocina.vue'
import shoppingCart from './sections/shoppingCart/shoppingCart.vue'

import footer from './components/footer'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
export const serverBus = new Vue();

Vue.component("carrousel", carrousel)
Vue.component("navigation-bar", navBar)
Vue.component("sections", sections)
Vue.component("shoppingCart", shoppingCart)
Vue.component("Practicocina", Practicocina)
Vue.component("custom-footer", footer)
Vue.component('b-icon', BIcon)
Vue.use(VueRouter)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue, BootstrapVueIcons, IconsPlugin)
Vue.config.productionTip = false
Vue.prototype.$shoppingCartList = {}

const routes = [
  { path: '/', component: Home},
  { path: '/shoppingCart', component: shoppingCart},
  { path: '/productos', component: productos}
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')