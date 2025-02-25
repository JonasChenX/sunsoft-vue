import { createRouter, createWebHistory } from 'vue-router'
const home = () => import('@/components/HelloWorld.vue');
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
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
