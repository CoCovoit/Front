import {ref} from 'vue'

/**
 * Singleton : le `ref` est défini au module-scope,
 * donc partagé par tous les composants qui importent ce composable.
 */
const isMobile = ref(window.innerWidth <= 768)
let listenerRegistered = false

export function useIsMobile() {
    // n’ajoute le listener qu’une seule fois
    if (!listenerRegistered) {
        const onResize = () => {
            isMobile.value = window.innerWidth <= 768
        }
        window.addEventListener('resize', onResize)
        // on appelle une fois pour initialiser
        onResize()
        listenerRegistered = true
    }

    return {isMobile}
}
