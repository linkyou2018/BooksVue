import Vue from 'vue'
import Router from 'vue-router'

import FragmentView from '../pages/fragment/layout'
import FragmentHomeView from '../pages/fragment/home'
import FragmentUserView from '../pages/fragment/user' 
import FragmentBagView from '../pages/fragment/bag' 
import FragmentBooListView from '../pages/fragment/bookList'
import FragmentcommunityView from '../pages/fragment/community'

import BookView from '../pages/book'

import UserLoginView from '../pages/user/Login'
import UserManageView from '../pages/user/manage'
import UserCommentView from '../pages/user/usercomment'

import OrderView from '../pages/order'
import SharIndexView from '../pages/share/index'
// import shareListView from '../pages/share/list'
import CommonwealIndexView from '../pages/commonweal/index'
import CommonwealDonationView from '../pages/commonweal/donation'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: FragmentView,
      children:[
          {
            path: '',
            component: FragmentHomeView
          },
          {
            path:'bag',
            component:FragmentBagView
          },
          {
            path: 'user',
            component: FragmentUserView
          },
          {
            path:'bookList',
            component:FragmentBooListView   
          },
          {
            path:'community',
            component:FragmentcommunityView   
          }
      ]
    },
    {
      path:'/user/login',
      component:UserLoginView
    },
    {
      path:'/user/manage',
      component:UserManageView
    },
    {
      path:'/user/usercomment',
      component:UserCommentView
    },
    {
      path:'/order',
      component:OrderView
    },
    {
      path:'/share',
      component:SharIndexView
    },
    {
      path:'/commonweal',
      component:CommonwealIndexView
    },
    {
      path:'/commonweal/donation',
      component:CommonwealDonationView
    }
]
})
