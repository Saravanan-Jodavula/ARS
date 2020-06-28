import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'

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
    currentAvg: [],
    totalAvg: [],
    labelAverage: [],
    globalMax: [],
    globalMin: [],
    userMax: [],
    userMin: [],
  },
  mutations: {
    login (state, obj) {
      state.avgDataTotal = obj.avgDataTotal
      state.avgDataUsers = obj.avgDataUsers
      state.pid = obj.pid
      state.avgLabels = obj.avgLabels
      console.log(state)
    },
    leftLegAvg (state, obj) {
      state.labelAverage.push('left-leg')
      state.currentAvg.push(obj.current_Average)
      state.totalAvg.push(obj.all_Time_Average)
    },
    rightLegAvg (state, obj) {
      state.labelAverage.push('right-leg')
      state.currentAvg.push(obj.current_Average)
      state.totalAvg.push(obj.all_Time_Average)
    },
    leftHandAvg (state, obj) {
      state.labelAverage.push('left-hand')
      state.currentAvg.push(obj.current_Average)
      state.totalAvg.push(obj.all_Time_Average)
    },
    rightHandAvg (state, obj) {
      state.labelAverage.push('right-hand')
      state.currentAvg.push(obj.current_Average)
      state.totalAvg.push(obj.all_Time_Average)
    },
  },
})

Vue.use(VuexI18n.plugin, store)

export default store
