import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from './router/index'

// PrimeVue styles
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import './style.css'

import App from './App.vue'

const app: VueApp = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: {
      light: Aura,
      dark: Aura
    },
    options: {
      prefix: 'p',
      darkModeSelector: 'white', // Valeur par défaut en 'white'
      cssLayer: false
    }
  }
})

app.mount('#app') 