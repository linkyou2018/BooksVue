import Vue from 'vue'
import vuex from 'vuex'
import index from './modules/index'

Vue.use(vuex);



export default new vuex.Store({
    modules:{
        index
    },
    created(){
       
    }
})