import { createApp, type App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import router from './router/index'

// Keycloak plugin for Vue
import { vueKeycloak } from '@josempgon/vue-keycloak';

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

// const app: VueApp = createApp(App)
// const pinia = createPinia()
//
// app.use(pinia)
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
// Install Keycloak plugin before router
// app.use(vueKeycloak, { config: keycloakConfig, initOptions: keycloakInitOptions });
// app.use(PrimeVue, {
//   // Default theme configuration
//   theme: {
//       preset: Aura,
//       options: {
//           prefix: 'p',
//           darkModeSelector: 'white',
//           cssLayer: false
//       }
//   }
// });
// app.use(ToastService);
// app.use(router)
//
// app.mount('#app')


const initApp = async () => {
    const app = createApp(App)

    // vos plugins non-dépendants de Keycloak
    app.use(createPinia())
    app.use(PrimeVue, {
        theme: { preset: Aura, options: { prefix: 'p', darkModeSelector: 'white', cssLayer: false } }
    })
    app.use(ToastService)

    // ⚠️ on attend ici que Keycloak soit prêt
    await vueKeycloak.install(app, { config: keycloakConfig, initOptions: keycloakInitOptions })  // :contentReference[oaicite:0]{index=0}

    // puis seulement on monte le router
    app.use(router)
    app.mount('#app')
}

initApp()