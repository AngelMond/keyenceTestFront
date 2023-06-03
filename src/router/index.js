import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {path: '/', component: () => import('../views/MainContentView.vue')},
  {path: '/:catchAll(.*)',component: () => import('../views/NotFound.vue')},
]


const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),

})

export default router
