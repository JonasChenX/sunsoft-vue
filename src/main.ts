import { createApp } from 'vue'
//引入pinia
import { createPinia } from 'pinia'
//引入router
import router from './router'
//引入vuetify
import vuetify from './vuetify'

//引入fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import App from '@/App.vue'
const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed solid icons
library.add(far) // Include needed regular icons

app.use(vuetify)
    .use(createPinia())
    .use(router)
    .mount('#app');
