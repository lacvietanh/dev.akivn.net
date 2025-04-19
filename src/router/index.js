import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/basics/:topic',
    name: 'Basics',
    component: () => import('../views/TopicPage.vue')
  },
  {
    path: '/tools/:topic',
    name: 'Tools',
    component: () => import('../views/TopicPage.vue')
  },
  {
    path: '/vue/:topic',
    name: 'Vue',
    component: () => import('../views/TopicPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
