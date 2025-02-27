import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import colors from 'vuetify/util/colors'
import '@mdi/font/css/materialdesignicons.css' // 確保已匯入 MDI 字體

const vuetify = createVuetify({
    components,
    directives,
    theme: { //設定主色配色
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: colors.grey.darken3,
                    secondary: colors.grey.lighten3,
                }
            },
        },
    },
    icons: {
        defaultSet: 'mdi', // 設定預設圖示集
    },
})

export default vuetify