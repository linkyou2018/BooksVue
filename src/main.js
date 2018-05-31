// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index.js'
import axios from 'axios'
import store from './store'
import vuescroll from 'vue-scroll'
import { Swipe, SwipeItem } from 'vue-swipe'


Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.use(vuescroll)
Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
