// import shop from '../../api/shop'
import API from '../../api'

const state = () => ({
  username: '',
  token: '',
  group: '',
  isLogin: false
})

// actions
const actions = {
  /**
   * 
   * @example
   * payload = { username, token }
   */
  async login ({ commit, state }, payload ) 
  {
    try
    {
      // console.log(payload)
      // let token = await API.User.login(payload)
      commit('setUsername', payload.username)
      commit('setToken', payload.token)
      commit('setLoginStatus', true)
      return {...payload}
    }
    catch( err )
    {
      throw new Error(err.msg)
    }

  },
  logout ({ commit, state }, payload ) {
    commit('setLoginStatus', false)
  }
}

// mutations
const mutations = {
  setUsername (state, username) {
    state.username = username
    console.log(state)
  },
  setToken (state, token) {
    state.token = token
  },
  setGroup (state, group) {
    state.group = group
  },
  setLoginStatus (state, status) {
    state.isLogin = status
  },


}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}