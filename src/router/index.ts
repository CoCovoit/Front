import {createRouter, createWebHistory, type RouteRecordRaw} from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import Dashboard from '../Pages/Dashboard.vue'
import Login from '../Pages/Login.vue'
import SignIn from '../Pages/SignIn.vue'
import SearchTrip from "@/Pages/SearchTrip.vue";
import KeyNumber from "@/Pages/KeyNumber.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: '/rechercher-un-trajet',
                name: 'Rechercher un trajet',
                component: SearchTrip
            },
            {
                path: '/chiffres-cles',
                name: 'chiffres clés',
                component: KeyNumber
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/SignIn',
        name: 'SignIn',
        component: SignIn
    },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router 