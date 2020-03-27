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
        {path:"center",meta:{title:'荟力管理'},component:resolve=>(require(["@/Pages/home/center"],resolve))},
        {path:"mine",meta:{title:'个人中心'},component: resolve=>(require(["@/Pages/home/mine"],resolve))},
      ]
    },
    {
      path: '/orgStatistics',
      name: 'orgStatistics',
      meta:{title:'门店统计'},
      component:resolve=>(require(["@/Pages/storeStatistics/orgStatisticsNew"],resolve))
    },
    {
      path: '/allGate',
      name: '/allGate',
      meta:{title:'访问统计'},
      component:resolve=>(require(["@/Pages/storeStatistics/allGate"],resolve))
    },
    {
      path: '/invest',
      name: 'invest',
      meta:{title:'招商助手'},
      component:resolve=>(require(["@/Pages/investAssistant/index"],resolve))
    },
    {
      path: '/brandData',
      name: 'brandData',
      meta:{title:'品牌信息'},
      component:resolve=>(require(["@/Pages/investAssistant/brandData"],resolve))
    },
    {
      path: '/calculator',
      name: 'calculator',
      meta:{title:'计算器'},
      component:resolve=>(require(["@/Pages/investAssistant/calculator"],resolve))
    },
    {
      path: '/ticket',
      name: 'ticket',
      meta:{title:'卡券核销'},
      component:resolve=>(require(["@/Pages/ticketExchange/index"],resolve))
    }
  ]
})
