import Vue from 'vue'
import Router from 'vue-router'
import PagesView from '../pages/Index'
import HomeView from '../pages/Home'
import UserView from '../pages/user'
import BookView from '../pages/book'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: PagesView,
      children: [
        {
          path: '',
          name: 'HomeView',
          component: HomeView
        },
        {
          path: 'user',
          name: 'UserView',
          component: UserView
        },
        {
          path: 'bookList',
          name: 'BookView',
          component: BookView
        }
      ]
    }
  ]
})
