import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home'
import login from '../pages/login'

Vue.use(VueRouter)

const routers = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/login',
            name: 'login',
            component: login
        }
    ]
})

export default routers