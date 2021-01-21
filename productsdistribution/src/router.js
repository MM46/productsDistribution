 import { createRouter, createWebHistory } from "vue-router"
 import Users from './views/Users.vue'
 import Home from './views/Home.vue'
     const routes = [
        {
            path : "/",
            component : Home
        },
        {
            path : "/users",
            component : Users
        }
    ]
    
    const router = createRouter({
        history: createWebHistory(),
        routes: routes
    })
    
export default router;