import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import Users from './Users.vue'

Vue.use(VueRouter)

const routes = [
    {path: '/ersers', component: Users},
    {path: '/', component: Home},
]

const router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)

})
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import "vuex"

// createApp(App).mount('#app')