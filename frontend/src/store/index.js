import Vue from 'vue'
import Vuex from 'vuex'
import VuexI18n from 'vuex-i18n' // load vuex i18n module
import app from './modules/app'

import * as getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false, // process.env.NODE_ENV !== 'production',
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
    peakLabels: [],
    twentyInstances: false,
    instanceFlag: false,
    refresh: false,
    refresh1: false,
    refresh2: false,
    refresh3: false,
  },
  mutations: {
    flushState (state) {
      console.log('flushing....')
      state.pid = null
      state.avgLabels = []
      state.avgDataUsers = []
      state.avgDataTotal = []
      state.currentAvg = []
      state.totalAvg = []
      state.labelAverage = []
      state.globalMax = []
      state.globalMin = []
      state.userMax = []
      state.userMin = []
      state.peakLabels = []
      state.twentyInstances = false
      state.instanceFlag = false
      state.refresh = false
      state.refresh1 = false
      state.refresh2 = false
      state.refresh3 = false
      console.log('flushed state is', state)
    },
    relod (state) {
      state.twentyInstances = !state.twentyInstances
      state.instanceFlag = !state.instanceFlag
      state.refresh = !state.refresh
      state.refresh1 = !state.refresh1
      state.refresh2 = !state.refresh2
      state.refresh3 = !state.refresh3
    },
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
    leftLegPeak (state, obj) {
      state.userMax.push(obj.userMax)
      state.userMin.push(obj.userMin)
      state.globalMax.push(obj.totalMax)
      state.globalMin.push(obj.totalMin)
    },
    rightLegPeak (state, obj) {
      state.userMax.push(obj.userMax)
      state.userMin.push(obj.userMin)
      state.globalMax.push(obj.totalMax)
      state.globalMin.push(obj.totalMin)
    },
    leftHandPeak (state, obj) {
      state.userMax.push(obj.userMax)
      state.userMin.push(obj.userMin)
      state.globalMax.push(obj.totalMax)
      state.globalMin.push(obj.totalMin)
    },
    rightHandPeak (state, obj) {
      state.userMax.push(obj.userMax)
      state.globalMax.push(obj.totalMax)
      state.globalMin.push(obj.totalMin)
    },
    logout (state, obj) {
      state.pid = null
      state.avgLabels = []
      state.avgDataUsers = []
      state.avgDataTotal = []
      state.currentAvg = []
      state.totalAvg = []
      state.labelAverage = []
      state.globalMax = []
      state.globalMin = []
      state.userMax = []
      state.userMin = []
      state.peakLabels = []
    },
  },
})

Vue.use(VuexI18n.plugin, store)

export default store
