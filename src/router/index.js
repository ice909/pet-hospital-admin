import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/stores'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404View.vue'),
  },
  {
    path: '/front',
    name: 'Front',
    component: () => import('@/views/front/FrontView.vue'),
    children: [
      {
        path: 'home',
        name: 'FrontHome',
        component: () => import('@/views/front/HomeView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  localStorage.setItem('currentPathName', to.name)
  store.setPath()
  if (!to.matched.length) {
    const menus = localStorage.getItem('menus')
    if (!menus) {
      next('/login')
    } else {
      next('/404')
    }
  } else {
    next()
  }
})

export const resetRouter = () => {
  const newRouter = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
  })
  router.matcher = newRouter // reset router
}

export const setRoutes = () => {}

export default router
