import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#2196f3',
        accent: '#ff5722',
        error: '#f44336',
        warning: '#ff9800',
        info: '#8bc34a',
        success: '#4caf50'
      }
    }
  },
  lang: {
    locales: { ru },
    current: 'ru'
  },
  icons: {
    iconfont: 'md'
  }
})
