import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import subbanner from './modules/subbanner'
// import cart from './modules/cart'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    subbanner
  },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
})