import router from '@/main/router'

router.addRoutes([
  {
    component: () => import(/* webpackChunkName: "home" */ './pages/home.vue'),
    meta: { auth: true, admin: true },
    name: 'home',
    path: '/',
  },
])
