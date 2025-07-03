import {createApp, type App as VueApp} from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast'

import router from './router/index'

// Keycloak plugin for Vue
import {vueKeycloak} from '@josempgon/vue-keycloak';

// PrimeVue styles
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'
import './style.css'

import App from './App.vue'


// Leaflet core + CSS
import 'leaflet/dist/leaflet.css';

// Routing Machine + CSS
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// Control Geocoder + CSS
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

// Keycloak configuration from env
const keycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL as string,
    realm: import.meta.env.VITE_KEYCLOAK_REALM as string,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENTID as string,
};
const keycloakInitOptions = {
    flow: 'standard',        // default
    pkceMethod: 'S256',
    checkLoginIframe: false, // default disables periodic SSO checks
    onLoad: 'login-required'
};


const initApp = async () => {
    const app = createApp(App)

    // 1️⃣ Pinia de base
    const pinia = createPinia()
    app.use(pinia)

    // 2️⃣ PrimeVue + thème
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: { prefix: 'p', darkModeSelector: 'white', cssLayer: false }
        }
    })

    // 3️⃣ ToastService (doit venir APRÈS PrimeVue)
    app.use(ToastService)
    app.component('Toast', Toast)


    // 5️⃣ Keycloak (on attend qu’il soit prêt)
    await vueKeycloak.install(app, {
        config: keycloakConfig,
        initOptions: keycloakInitOptions
    })

    // 6️⃣ Router et montage final
    app.use(router)
    app.mount('#app')
}


initApp()