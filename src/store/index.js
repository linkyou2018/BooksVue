import Vue from 'vue'
import vuex from 'vuex'
import share from './modules/share'
import home from './modules/home'
import user from './modules/user'
import bookList from './modules/bookList'

Vue.use(vuex);


export default new vuex.Store({
    modules:{
        share,
        home,
        user,
        bookList
    }
})