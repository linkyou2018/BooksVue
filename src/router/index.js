import Vue from 'vue'
import Router from 'vue-router'
import PagesView from '../pages/Index'
import HomeView from '../pages/Home'
import UserView from '../pages/user'
import BookView from '../pages/book'
import TestView from '../pages/test/index'

Vue.use(Router)

export default new Router({
  mode: 'history',  
  routes: [
    {
      path: '/',
      redirect: '/pages'
    },
    {
      path: '/pages',
      component: PagesView,
      children: [
        {
          path: '',
          redirect: '/pages/home'
        },
        {
          path: 'home',
          name: 'HomeView',
          component: HomeView
        },
        {
          path:'user',
          name:'UserView',
          component:UserView
        },
        {
          path:'bookList',
          name:'BookView',
          component:BookView
        },
        {
            path:'test',
            name:"TestView",
            component:TestView
        }
      ]
    }
  ]
})
