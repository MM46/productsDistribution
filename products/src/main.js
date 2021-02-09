import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Register from './Register.vue'
import Login from './Login.vue'
import agregarProducto from './admin/addProduct.vue'
import agregarSeccion from './admin/addSection.vue'
import dashboard from './admin/dashboard.vue'
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
import store from "./store";
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'home',
          component: Home
      },
      {
          path: '/shoppingCart',
          name: 'shoppingCart',
          component: shoppingCart
      },
      {
          path: '/productos',
          name: 'productos',
          component: productos
      },
      {
          path: '/login',
          name: 'login',
          component: Login
      },
      {
          path: '/register',
          name: 'Register',
          component: Register
      },
      {
          path: '/agregarProducto',
          name: 'agregarProducto',
          component: agregarProducto
      },
      {
        path: '/agregarSeccion',
        name: 'agregarSeccion',
        component: agregarSeccion
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    },
]
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')