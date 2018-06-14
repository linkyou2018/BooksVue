import api from '../../api/index.js'

const state = {
  accessToken:{
    token:"",
    OpenId:"",
    expires:""
  },
  isLogin: false,
  member:{}
}

const getters = {
  currentUser: state => {
    return {
      token:state.accessToken.token,
      name: state.login_name,
      openId:state.accessToken.openId,
      expires:state.accessToken.expires,
      member:state.member,
      isLogin:state.isLogin

    }
  }
}

const actions = {
  getOpenId({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      api.get('Shared/GetJssdkConfig',{
        code:payload.code
      },res=>{
        commit({
          type: "setAccessToken",
          res:res,
        })
        resolve(res)
      },err=>{
        reject(f)
      })
    })  
  },
  getMember({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      api.get("Member/GetMember", null, res => {
        commit({
          type: "setUser",
          res:res
        })
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }

}

const mutations = {
  getLocalUser(state) {
    state.login_token = localStorage.getItem('token')
    state.login_name = localStorage.getItem('name')
  },
  setAccessToken(state,payload){
    localStorage.setItem("token",payload.res.access_token)
    localStorage.setItem("expires",payload.res.expires)
    sessionStorage.setItem("OpenId",payload.res.OpenId);
    state.accessToken.OpenId=payload.res.OpenId;
    state.accessToken.token=payload.res.access_token;
    state.accessToken.expires=payload.res.expires;

  },
  setUser(state, payload) {
    // state.login_name = payload.res.NickName
    // state.accessToken.OpenId=payload.res.OpenId;
    // state.integral=payload.res.Integral==null?0:payload.res.Integral;
    // state.headimg=payload.res.PhotoPath;
    state.member=payload.res;
    state.isLogin=true;

  },
  logout(state) {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    sessionStorage.removeItem("OpenId")
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
