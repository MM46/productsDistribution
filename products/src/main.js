import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Register from './Register.vue'
import Login from './Login.vue'
import Dashboard from './components/Dashboard.vue'
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
import { firebase } from '@firebase/app';
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
const configOptions = {
  apiKey: "AIzaSyBimWPAhwg2E9pTOLO-uT4n-I87ZrU1aTk",
  authDomain: "productsdistribution.firebaseapp.com",
  projectId: "productsdistribution",
  storageBucket: "productsdistribution.appspot.com",
  messagingSenderId: "394733699795",
  appId: "1:394733699795:web:1aac188447ce1a90880a26",
  measurementId: "G-R9M7H1DC7V"
};
firebase.initializeApp(configOptions);
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});
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
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard
      },
]
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app')