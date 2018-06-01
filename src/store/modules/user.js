import api from '../../api/index.js'

const state = {
  isLogin: false,
  login_token: '',
  login_name: '',
  login_token: '',
  login_memberId: ''
}

const getters = {
  currentUser: state => {
    return {
      token: state.login_token,
      name: state.login_name,
      token: state.login_token,
      memberId: state.login_memberId
    }
  }
}

const actions = {
  login({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      var asscessToken=localStorage.getItem("token");
      if(asscessToken!=null)
      {
        resolve(asscessToken)
      }
      else{
        api.get('GetPasswordToken', {
          grant_type: "password",
          appid: "Books",
          secret: "9FA4819C-00AE-4ABC-9569-8A985E7CC549",
          openId: payload.openId
        }, res => {
          var json=JSON.parse(res);
          localStorage.setItem('token', json.access_token)
          commit({
            type: "setUser",
            token: json.token
          })
          resolve(json)
        }, err => {
          reject(f)
        })
      }

    })
  },
  getMember({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      api.get("Member/GetMember"
      ,null
      ,res=>{
        commit({
          type:"setUser",
          name:res.NickName,
          memberId:res.MemberId
        })
        resolve(res)
      },err=>{
        reject(err)
      })
    })
  }
}

const mutations = {
  updateData(state, payload) {
    switch (payload.name) {
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
  getLocalUser(state) {
    state.login_token = localStorage.getItem('token')
    state.login_name = localStorage.getItem('name')
  },
  setUser(state, payload) {
    console.log(payload)
    state.login_name = payload.name
    state.login_memberId = payload.memberId,
    state.login_token = payload.token;
  },
  logout(state) {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    state.login_token = ''
    state.login_name = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
