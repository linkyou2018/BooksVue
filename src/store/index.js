import Vue from 'vue'
import vuex from 'vuex'
import index from './modules/index'
import user from './modules/user'

Vue.use(vuex);


export default new vuex.Store({
    modules:{
        index,
        user
    }
})