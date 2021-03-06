// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {cookies} from './cookies'
import VueMaterial from 'vue-material'
import "vue-material/dist/vue-material.min.css";
// import "vue-material/dist/theme/default-dark.css";
// import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  cookies,
  components: { App },
  template: '<App/>'
})
