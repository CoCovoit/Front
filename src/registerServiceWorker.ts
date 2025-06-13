import { registerSW } from 'virtual:pwa-register'

export const updateSW = registerSW({
    onNeedRefresh() { /* prévenir l’utilisateur */ },
    onOfflineReady() { /* prêt hors-ligne */ },
})
