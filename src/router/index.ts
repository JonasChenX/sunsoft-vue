import { createRouter, createWebHistory } from 'vue-router'
const home = () => import('@/components/Home.vue');
import ss01 from '@/router/ss01'
const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'home',
        meta: { requiresAuth: true },
        component: home
    },
    ...ss01
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
