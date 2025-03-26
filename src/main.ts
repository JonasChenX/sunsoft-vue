import {createApp} from 'vue'
//引入pinia
import { createPinia } from 'pinia'
//引入router
import router from './router'
//引入vuetify
import vuetify from './vuetify'
//引入Notifications
import Notifications from '@kyvg/vue3-notification'

//引入fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import App from '@/App.vue'
import AccountService from "@/core/login/account-service";
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";
import {useAccountStore} from "@/store/account-store";
import {writeFunctionUsageLog} from "@/core/login/account-api";
import {setupAxiosInterceptors} from "@/axios";
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed solid icons
library.add(far) // Include needed regular icons

let pinia = createPinia();
const accountService = new AccountService(pinia, router);
console.log(accountService)
app.provide('accountService', accountService);

app.use(vuetify)
    .use(pinia)
    .use(router)
    .use(Notifications);

setupAxiosInterceptors(
    error => {
        console.log('Unauthorized!');
        return Promise.reject(error);
    },
    error => {
        console.log('Server error!');
        return Promise.reject(error);
    }
);

app.mount('#app');

router.beforeEach((to, from, next) => {
    if (to.path === '/forbidden' || to.path === '/not-found' || to.path === '/error') {
        next();
        return;
    }
    routeGuard(to, from, next)
})

const routeGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const accountStore = useAccountStore();
    // You can log `from` and `to` for debugging purposes
    console.log('Navigating from:', from);
    console.log('Navigating to:', to);

    if (to.path !== from.path) {
        accountStore.setCurrentFunctionId('');
    }
    if (!to.matched.length) {
        next('/not-found');
    }

    if (to.path === '/login' || to.path === '/forbidden' || to.path === '/not-found') {
        if (sessionStorage.getItem(accountStore.getRequestedUrlKey) === null && to.path !== '/forbidden') {
            sessionStorage.setItem(accountStore.getRequestedUrlKey, to.fullPath);
        }
        next();
    } else {
        accountService.checkAuth().then(authenticated => {
            console.log(authenticated)
            if (!authenticated) {
                sessionStorage.setItem(accountStore.getRequestedUrlKey, to.fullPath);
                next('/login');
                return;
            }
            if (to.path === '/') {
                next();
                return;
            }
            if (!(to.meta && to.meta.functionId)) {
                alert('請確定 Route 中的 meta.functionId 設定正確');
                next('/forbidden');
                return;
            }
            accountService.hasAnyAuthority(to.meta.functionId).then(hasAuthority => {
                if (!hasAuthority) {
                    next('/forbidden');
                    return;
                }
                accountStore.setCurrentFunctionId(String(to.meta.functionId));
                if (typeof to.meta.functionId == 'string') {
                    writeFunctionUsageLog(); //共用元件不用紀錄
                }
                next();
            });
        });
    }

};
