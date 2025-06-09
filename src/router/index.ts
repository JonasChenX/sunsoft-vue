import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router } from 'vue-router'
const home = () => import('@/components/Home.vue');
const forbiddenView = () => import('@/components/ForbiddenView.vue');
const notFoundView = () => import('@/components/NotFoundView.vue');
const login = () => import('@/core/login/Login.vue');
import ts01 from '@/router/ts01'
import ss01 from '@/router/ss01'
import ss03 from '@/router/ss03'
import ss09 from '@/router/ss09'
import { useAccountStore } from "@/store/account-store";
import { writeFunctionUsageLog } from "@/core/login/account-api";
import AccountService from "@/core/login/account-service";
import { useAppStateStore } from "@/store/app-state-store";
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
    ...ts01,
    ...ss01,
    ...ss03,
    ...ss09
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export const setupRouter = (router: Router, accountService: AccountService) => {
    const appStateStore = useAppStateStore();

    router.beforeEach((to, from, next) => {
        if (to.path === '/forbidden' || to.path === '/not-found' || to.path === '/error') {
            return next();
        }

        if(to.path !== '/login'){
            appStateStore.viewLoadingStart();
        }

         routeGuard(to, from, next);
    })

    router.afterEach(()=>{
        setTimeout(() => {
            appStateStore.viewLoadingEnd();
        }, 300); // 設定一個短暫的延遲，確保 loading 效果明顯
    })

    const routeGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        const accountStore = useAccountStore();
        if (to.path !== from.path) {
            accountStore.setCurrentFunctionId('');
        }
        if (!to.matched.length) {
            return next('/not-found');
        }

        if (to.path === '/login') {
            return next();
        } else {
            accountService.checkAuth().then(authenticated => {
                console.log(authenticated)
                if (!authenticated) {
                    sessionStorage.setItem(accountStore.getRequestedUrlKey, to.fullPath);
                    return next('/login');;
                }
                if (to.path === '/') {
                    return next();
                }
                if (!(to.meta && to.meta.functionId)) {
                    alert('請確定 Route 中的 meta.functionId 設定正確');
                    return next('/forbidden');
                }
                accountService.hasAnyAuthority(to.meta?.functionId as string).then(hasAuthority => {
                    if (!hasAuthority) {
                        return next('/forbidden');
                    }
                    accountStore.setCurrentFunctionId(String(to.meta.functionId));
                    if (typeof to.meta.functionId == 'string') {
                        writeFunctionUsageLog(); //共用元件不用紀錄
                    }
                    return next();
                });
            });
        }
    };
}

export default router
