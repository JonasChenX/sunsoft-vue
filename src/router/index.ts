import {createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized, Router} from 'vue-router'
const home = () => import('@/components/Home.vue');
const forbiddenView = () => import('@/components/ForbiddenView.vue');
const notFoundView = () => import('@/components/NotFoundView.vue');
const login = () => import('@/core/login/Login.vue');
import ss01 from '@/router/ss01'
import {useAccountStore} from "@/store/account-store";
import {writeFunctionUsageLog} from "@/core/login/account-api";
import AccountService from "@/core/login/account-service";
import {useAppStateStore} from "@/store/app-state-store";
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

export const setupRouter = (router: Router, accountService: AccountService) => {
    const appStateStore = useAppStateStore();

    let loadingTimeout: ReturnType<typeof setTimeout>;
    router.beforeEach((to, from, next) => {
        if (to.path === '/forbidden' || to.path === '/not-found' || to.path === '/error') {
            return next();
        }

        // 設定 1 秒後才執行 viewLoadingStart
        loadingTimeout = setTimeout(() => {
            appStateStore.viewLoadingStart();
        }, 1000);

        routeGuard(to, from, next);
    })

    router.afterEach(()=>{
        clearTimeout(loadingTimeout);
        appStateStore.viewLoadingEnd()
    })

    const routeGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        const accountStore = useAccountStore();
        if (to.path !== from.path) {
            accountStore.setCurrentFunctionId('');
        }
        if (!to.matched.length) {
            return next('/not-found');
        }

        if (to.path === '/login' || to.path === '/forbidden' || to.path === '/not-found') {
            if (sessionStorage.getItem(accountStore.getRequestedUrlKey) === null && to.path !== '/forbidden') {
                sessionStorage.setItem(accountStore.getRequestedUrlKey, to.fullPath);
            }
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
