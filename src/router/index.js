import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../pages/home'
import login from '../pages/login'
import teste from '../pages/teste'

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
        },
        {
            path: '/teste',
            name: 'teste',
            component: teste
        }
    ]
})

export default routers