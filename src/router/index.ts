import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import Dashboard from '../Pages/Dashboard.vue'
import Login from '../Pages/Login.vue'
import SignIn from '../Pages/SignIn.vue'
import SearchTrip from "@/Pages/SearchTrip.vue";
import KeyNumber from "@/Pages/KeyNumber.vue";
import Profile from "@/Pages/Profile.vue";
import CreateTrip from "@/Pages/CreateTrip.vue";
import {useKeycloak} from "@josempgon/vue-keycloak";
import RhDashboard from "@/Pages/RhDashboard.vue";
import {useUserStore} from "@/compositions/user/userStore.ts";
import {parseJwt} from "@/utils/jwtUtils.ts";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard,
                meta: {requiresAuth: true}
            },
            {
                path: '/rechercher-un-trajet',
                name: 'Rechercher un trajet',
                component: SearchTrip,
                meta: {requiresAuth: true}
            },
            {
                path: '/creer-un-trajet',
                name: 'Creer un trajet',
                component: CreateTrip,
                meta: {requiresAuth: true}
            },
            {
                path: '/chiffres-cles',
                name: 'chiffres clés',
                component: KeyNumber,
                meta: {requiresAuth: true}
            },
            {
                path: '/rh-dashboard',
                name: 'Tableau de bord RH',
                component: RhDashboard,
                meta: {
                    requiresAuth: true,
                    requiredRoles: ['traveler', 'admin']
                }

            },
            {
                path: '/profil',
                name: 'profil',
                component: Profile,
                meta: {requiresAuth: true}
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/signin',
        name: 'signin',
        component: SignIn
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

// Guard global
// router.beforeEach(async (to, from, next) => {
//     const {keycloak} = useKeycloak();
//
//     console.log('keycloak',keycloak);
//     console.log('keycloak.value?.authenticated',keycloak.value?.authenticated);
//     console.log('keycloak.value',keycloak.value);
//
//     // Si la route n'a pas besoin d'auth, on passe
//     if (!to.meta.requiresAuth) {
//         return next();
//     }
//
//     // Si pas authentifié, redirige vers /login
//     if (!keycloak.value?.authenticated) {
//         console.log('Utilisateur non authentifié, redirection vers la page de connexion');
//         return next({name: 'login'});
//     }
//
//     // Si des rôles sont requis, vérifie-les
//     const requiredRoles = to.meta.requiredRoles as string[] | undefined;
//     if (requiredRoles && requiredRoles.length > 0) {
//         const hasRole = requiredRoles.some(role =>
//             keycloak.value?.hasRealmRole(role)
//         );
//         if (!hasRole) {
//             return next({name: 'dashboard'});
//         }
//     }
//
//     // Tout est ok
//     next();
// });

router.beforeEach((to, from, next) => {
    const { keycloak, isAuthenticated } = useKeycloak()
    const userStore = useUserStore()


    console.log('keycloak',keycloak);
    console.log('keycloak.value?.authenticated',keycloak.value?.authenticated);
    console.log('keycloak.value',keycloak.value);

    // pas d’auth nécessaire ?
    if (!to.meta.requiresAuth) {
        return next()
    }

    // authentification Keycloak terminée, on vérifie
    if (!isAuthenticated.value) {
        return next({ name: 'login' })
    }

    if (isAuthenticated ) {
        const email = parseJwt(keycloak.value?.token).email
        userStore.fetchUserAndTrajetByEmail(email)
    }

    // vérification des rôles éventuels…
    const requiredRoles = to.meta.requiredRoles as string[] | undefined
    if (requiredRoles?.length && !requiredRoles.some(r => keycloak.value!.hasRealmRole(r))) {
        return next({ name: 'dashboard' })
    }

    next()
})

export default router 