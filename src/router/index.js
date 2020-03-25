import Vue from 'vue'
import Router from 'vue-router'
import home from '@/Pages/home/home'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: home
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: '/home/center',
      children:[
        {path:"center",component:resolve=>(require(["@/Pages/home/center"],resolve))},
        {path:"mine",component: resolve=>(require(["@/Pages/home/mine"],resolve))},
      ]
    },
    {
      path: '/orgStatistics',
      name: 'orgStatistics',
      component:resolve=>(require(["@/Pages/manage/orgStatisticsNew"],resolve))
    }
  ]
})
