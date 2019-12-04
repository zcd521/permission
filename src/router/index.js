import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [

    {
      path: '/',
      redirect: "/a",
      component: () => import('@/components/view/index'),
      children:[
        {
          path: '/a',
          name: 'a',
          component: () => import('@/components/a'),
          meta:{  title: '第一', keepAlive:false}
        },]
    },
    {
      path: '/login',
      meta:{keepAlive:false},
      component: () => import ('@/components/Login/Login')
    },
  ]
})
// 全局路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.NxToken ? true : false;
  if( to.path =='/login'){ 
    next();
  }else {
    isLogin ? next() : next('/login')
  } 
})

export default router;