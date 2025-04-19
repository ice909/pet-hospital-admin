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

export const setRoutes = () => {
  const storeMenus = localStorage.getItem('menus')
  if (storeMenus) {
    const manageRoute = {
      path: '/',
      name: 'Manage',
      component: () => import('@/views/ManageView.vue'),
      redirect: '/login',
      children: [
        { path: 'person', name: '个人信息', component: () => import('@/views/PersonView.vue') },
        { path: 'password', name: '修改密码', component: () => import('@/views/PasswordView.vue') },
      ],
    }
    const menus = JSON.parse(storeMenus)
    menus.forEach((item) => {
      if (item.path) {
        // 当且仅当path不为空的时候才去设置路由
        let itemMenu = {
          path: item.path.replace('/', ''),
          name: item.name,
          component: () => import('../views/' + item.pagePath + '.vue'),
        }
        manageRoute.children.push(itemMenu)
      } else if (item.children.length) {
        item.children.forEach((item) => {
          if (item.path) {
            let itemMenu = {
              path: item.path.replace('/', ''),
              name: item.name,
              component: () => import('@/views/' + item.pagePath + '.vue'),
            }
            manageRoute.children.push(itemMenu)
          }
        })
      }
    })

    // 获取当前的路由对象名称数组
    const currentRouteNames = router.getRoutes().map((v) => v.name)
    if (!currentRouteNames.includes('Manage')) {
      // 动态添加到现在的路由对象中去
      router.addRoute(manageRoute)
    }
  }
}

setRoutes()

export default router
