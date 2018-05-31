const state={
    isLogin:false,
    login_email: '',
    login_token: '',
    login_name: ''
}

const getters={
    currentUser: state => {
        return {
          email: state.login_email,
          token: state.login_token,
          name: state.login_name
        }
      }
}

const actions={
    login({commit},payload)
    {


    },
    register ({ commit }, payload) {
        
    }

}

const mutations ={
    updateData (state, payload) {
        switch (payload.name) {
          case 'email':
            state.temp_email = payload.value
            break
          case 'token':
            state.temp_token = payload.value
            break
          case 'name':
            state.temp_name = payload.name
            break
          default:
            console.log('Error:Dont directly mutate Vuex store')
        }
      },
      getLocalUser (state) {
        state.login_email = localStorage.getItem('email')
        state.login_token = localStorage.getItem('token')
        state.login_name = localStorage.getItem('name')
      },
      setUser (state, payload) {
        state.login_email = payload.email
        state.login_token = payload.token
        state.login_name = payload.name
      },
      logout (state) {
        localStorage.removeItem('email')
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        state.login_email = ''
        state.login_token = ''
        state.login_name = ''
      }
}

export default{
    state,
    getters,
    actions,
    mutations

}