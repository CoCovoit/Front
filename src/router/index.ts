import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import App from '../App.vue'
import MainLayout from '../components/MainLayout.vue'
import Home from '../Pages/Home.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      }
    ]
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 