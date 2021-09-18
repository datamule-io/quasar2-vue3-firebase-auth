
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), meta: {requiresAuth: true} },
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '/auth/login', component: () => import('pages/Auth.vue') }
    ]
  },
  // {
  //   path: '/login',
  //   component: () => import('pages/auth/login')
  // },
  // {
  //   path: '/success',
  //   component: () => import('pages/auth/success'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/verifyEmail',
  //   component: () => import('pages/auth/verifyEmail'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: '/completeAccount',
  //   component: () => import('pages/auth/completeAccount'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
