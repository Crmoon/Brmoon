// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import axios from '../node_modules/axios'
import qs from '../node_modules/qs'
import 'font-awesome/css/font-awesome.css'
import Group from '../src/components/Group'

import Pushtext from './js/comment'
window.Pushtext=Pushtext;

Vue.config.productionTip = false

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.Group = Group;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
