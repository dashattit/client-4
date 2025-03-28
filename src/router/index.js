import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '@/views/Catalog.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Cart from '@/views/Cart.vue'
import Orders from '@/views/Orders.vue'

const routes = [
  { path: '/', component: Catalog },
  { path: '/login', component: Login, meta: { requiresGuest: true } },
  { path: '/register', component: Register, meta: { requiresGuest: true } },
  { path: '/cart', component: Cart, meta: { requiresAuth: true } },
  { path: '/orders', component: Orders, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router