import { createApp } from 'vue'
//引入pinia
import { createPinia } from 'pinia'
//引入router
import router from './router'
//引入vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
    components,
    directives,
})
import App from './App.vue'
const app = createApp(App);
app.use(vuetify)
    .use(createPinia())
    .use(router)
    .mount('#app');
