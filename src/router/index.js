import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // Utilisation du chargement à la demande pour les pages moins fréquemment visitées
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/values',
      name: 'values',
      component: () => import('../views/ValuesView.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
    },
  ],
})

export default router
