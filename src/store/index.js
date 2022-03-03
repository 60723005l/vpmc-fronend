import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import widgetSidebar from './modules/widgetSidebar'
import appraisalAnalysisSidebar from './modules/appraisalAnalysisSidebar'
import statsAndQuoteSidebar from './modules/statsAndQuoteSidebar'
import measurement from './modules/measurement'
// import cart from './modules/cart'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    user,
    widgetSidebar,
    measurement,
    appraisalAnalysisSidebar,
    statsAndQuoteSidebar
  },
//   strict: debug,
//   plugins: debug ? [createLogger()] : []
})