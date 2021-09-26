// import shop from '../../api/shop'
import store from '..'
import API from '../../api'

/**
 * @interface
 */
 export const ILoginPayload = { username: '', token: '', role: '', id: '' }

/**
 * @interface
 */
export const IState = {username: '',token: '',group: '', role: '', id: '',isLogin: false}

/**
 * 
 * @returns {IState}
 */
const state = () => ({
  username: '',
  token: '',
  role: '',
  id: '',
  group: '',
  isLogin: false
})


// actions
const actions = {
  /**
   * 
   * @example
   * @param {{commit: import('vuex').Commit, state: IState}}
   * @param {ILoginPayload} payload
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
      commit('setRole', payload.role)
      commit('setId', payload.id)
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
  setRole ( state, role ) {
    state.role = role
  },
  setId ( state, id ) {
    state.id = id
  }


}

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations
}