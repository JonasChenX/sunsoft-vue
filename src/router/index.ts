import {createRouter, createWebHistory} from 'vue-router'
const home = () => import('@/components/Home.vue');
const forbiddenView = () => import('@/components/ForbiddenView.vue');
const notFoundView = () => import('@/components/NotFoundView.vue');
const login = () => import('@/core/login/Login.vue');
import ss01 from '@/router/ss01'
const routes = [
    {
        path: '/login',
        name: 'login',
        meta: { requiresAuth: false },
        component: login
    },
    {
        path: '/',
        name: 'home',
        meta: { requiresAuth: true },
        component: home
    },
    {
        path: '/forbidden',
        name: 'errorView',
        meta: { requiresAuth: false },
        component: forbiddenView
    },
    {
        path: '/not-found',
        name: 'notFound',
        meta: { requiresAuth: false },
        component: notFoundView
    },
    ...ss01
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
