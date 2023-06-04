import { createRouter, createWebHistory } from 'vue-router';


const routes = [
  {path: '/', component: () => import('../views/HomepageView.vue')},
  {path: '/login', component: () => import('../components/LoginForm.vue')},
  {path: '/readFile', component: () => import('../components/ReadFile.vue')},
  {path: '/tableRegisters', component: () => import('../components/TableRegisters.vue')},  
  {path: '/:catchAll(.*)',component: () => import('../views/NotFound.vue')},
]


const router = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),

})

export default router
