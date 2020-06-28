import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'
import axios from 'axios'

import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true, // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    app,
  },
  state: {
    pid: null,
    avgLabels: [],
    avgDataUsers: [],
    avgDataTotal: [],
  },
  mutations: {
    login (state, obj) {
      state.avgDataTotal = obj.avgDataTotal
      state.avgDataUsers = obj.avgDataUsers
      state.pid = obj.pid
      state.avgLabels = obj.avgLabels
      console.log(state)
    },
  },
})

Vue.use(VuexI18n.plugin, store)

export default store
