import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import subbanner from './modules/subbanner'
import measurement from './modules/measurement'
// import cart from './modules/cart'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    subbanner,
    measurement
  },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
})