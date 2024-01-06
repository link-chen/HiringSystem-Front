import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'UserLogin',
    component: () => import(/* webpackChunkName: "about" */ '../components/UserLogin.vue')
  },
  {
    path: '/Regist',
    name: 'UserRegist',
    component: () => import(/* webpackChunkName: "about" */ '../components/UserRegist.vue')
  },
  {
    path: '/SearchJobs',
    name: 'SearchJobs',
    component: () => import(/* webpackChunkName: "about" */ '../components/SearchJobs.vue')
  },
  {
    path: '/HRSpace',
    name: 'HRSpace',
    component: () => import(/* webpackChunkName: "about" */ '../components/HRSpace.vue')
  },
  {
    path: '/JobEditor',
    name: 'JobEditor',
    component: () => import(/* webpackChunkName: "about" */ '../components/JobEditor.vue')
  },
  {
    path: '/UserSpace',
    name: 'UserSpace',
    component: () => import(/* webpackChunkName: "about" */ '../components/UserSpace.vue')
  },
  {
    path: '/ApplyerList',
    name: 'ApplyerList',
    component: () => import(/* webpackChunkName: "about" */ '../components/ApplyerList.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
