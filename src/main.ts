import {createApp} from 'vue'
//引入pinia
import { createPinia } from 'pinia'
//引入router
import router, {setupRouter} from './router'
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
import {setupAxiosInterceptors} from "@/axios";
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed solid icons
library.add(far) // Include needed regular icons

let pinia = createPinia();
const accountService = new AccountService(pinia, router);
app.provide('accountService', accountService);

app.use(vuetify)
    .use(pinia)
    .use(router)
    .use(Notifications);

const HEADER_INFO_KEY = "x-ss-info-alert";
const HEADER_ERROR_KEY = "x-ss-error-alert";
import { useNotify } from "@/common/notify/notify";
import {useAccountStore} from "@/store/account-store";
const { errorNotify, successNotify }  = useNotify()
const accountStore = useAccountStore();
setupAxiosInterceptors(
    error => {
        errorNotify("沒有授權請重新登入", error.message);
        accountStore.logout();
        sessionStorage.removeItem(accountStore.getAuthenticationTokenKey);
        router.push('/login');
        return Promise.reject(error);
    },
    error => {
        const { response } = error;
        const errorMessage = response.headers?.[HEADER_ERROR_KEY];
        if (errorMessage) {
            errorNotify(decodeURIComponent(errorMessage));
        }
        return Promise.reject(error);
    },
    res => {
        const infoMessage = res.headers?.[HEADER_INFO_KEY];
        if (infoMessage) {
            successNotify(decodeURIComponent(infoMessage));
        }
        return Promise.resolve(res)
    }
);

setupRouter(router, accountService);

app.mount('#app');
