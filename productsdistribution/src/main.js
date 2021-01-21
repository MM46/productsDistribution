import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import { BootstrapVue, IconsPlugin } from '../node_modules/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import { BNavbar } from 'bootstrap-vue'
// App.component('b-navbar', BNavbar)
createApp(App).use(router, BootstrapVue, IconsPlugin).mount('#app')