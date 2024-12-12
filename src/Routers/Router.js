
import { createWebHistory ,createRouter } from "vue-router";

import Home from "../components/Home.vue"
import Cart from "../components/Cart.vue"


const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            name :"home",
            component:Home
        },
        {
            path:'/cart',
            name:"cart",
            component:Cart
        }

    ]
})

export default router