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

setupRouter(router, accountService);

app.mount('#app');
