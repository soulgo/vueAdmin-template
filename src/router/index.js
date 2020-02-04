import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    icon: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/vuex',
    component: Layout,
    children: [
      {
        path: '',
        name: 'vuex',
        component: () => import('@/views/vuex-demo/index'),
        meta: { title: 'VuexDemo', icon: 'user' }
      }
    ]
  },
  {
    path: '/server',
    component: Layout,
    children: [
      {
        path: '',
        name: 'resources',
        component: () => import('@/views/server/index'),
        meta: { title: 'server', icon: 'user' }
      }
    ]
  },
  {
    path: '/idcs',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Idcs',
        component: () => import('@/views/idcs/index'),
        meta: { title: 'Idcs', icon: 'tree' }
      }
    ]
  },
  {
    path: '/manufacturer',
    component: Layout,
    children: [
      {
        path: '',
        name: 'manufacturer',
        component: () => import('@/views/manufacturer/index'),
        meta: { title: 'manufacturer', icon: 'tree' }
      }
    ]
  },
  {
    path: '/books',
    component: Layout,
    redirect: '/books/book',
    name: '图书管理系统',
    meta: {
      title: '图书管理系统',
      icon: 'user'
    },
    children: [
      {
        path: 'book',
        name: '图书',
        component: () => import('@/views/books/book/index'),
        meta: { title: '图书', icon: 'tree' }
      },
      {
        path: 'author',
        name: '作者',
        component: () => import('@/views/books/author/index'),
        meta: { title: '作者', icon: 'tree' }
      },
      {
        path: 'publish',
        name: '出版社',
        component: () => import('@/views/books/publish/index'),
        meta: { title: '出版社', icon: 'tree' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

