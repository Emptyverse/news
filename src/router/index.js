import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'footerPage',
    redirect: '/homePage',
    component: () => import('@/views/footerPage/FooterPage.vue'),
    children: [
      {
        path: '/homePage',
        name: 'homePage',
        component: () => import('@/views/homePage/HomePage.vue')
      },
      {
        path: '/personalPage',
        name: 'personalPage',
        component: () => import('@/views/personalPage/PersonalPage.vue')
      },
      {
        path: '/questionPage',
        name: 'questionPage',
        component: () => import('@/views/questionPage/QuestionPage.vue')
      },
      {
        path: '/videoPage',
        name: 'videoPage',
        component: () => import('@/views/videoPage/VideoPage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'loginPage',
    component: () => import('@/views/loginPage/LoginPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
