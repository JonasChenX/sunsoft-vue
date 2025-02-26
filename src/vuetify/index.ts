import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import colors from 'vuetify/util/colors'

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

})

export default vuetify