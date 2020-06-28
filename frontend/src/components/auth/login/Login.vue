<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="pid"
      :label="$t('Profile ID')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />
    <p class="d-flex justify--center mt-3" >Loading, Please Wait</p>
    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      pid: null,
      password: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
    }
  },

  methods: {
    async onsubmit () {
      var objj = {
        pid: this.pid,
        avgLabels: [],
        avgDataUsers: [],
        avgDataTotal: [],
      }
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/usersavg/left-hand/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log('1')
          objj.avgLabels.push('left-hand')
          objj.avgDataUsers.push(resp.data.userAverage)
          objj.avgDataTotal.push(resp.data.totalAverage)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/usersavg/right-hand/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log('2')
          objj.avgLabels.push('right-hand')
          objj.avgDataUsers.push(resp.data.userAverage)
          objj.avgDataTotal.push(resp.data.totalAverage)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/usersavg/left-leg/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log('3')
          objj.avgLabels.push('left-leg')
          objj.avgDataUsers.push(resp.data.userAverage)
          objj.avgDataTotal.push(resp.data.totalAverage)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/usersavg/right-leg/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log('4')
          objj.avgLabels.push('right-leg')
          objj.avgDataUsers.push(resp.data.userAverage)
          objj.avgDataTotal.push(resp.data.totalAverage)
        })
        .catch((err) => console.log(err))
        .then(() => this.$store.commit('login', objj))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/currentvsall/left-leg/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log('3 is', resp.data)
          this.$store.commit('leftLegAvg', resp.data)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/currentvsall/right-leg/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log('3 is', resp.data)
          this.$store.commit('rightLegAvg', resp.data)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/currentvsall/left-hand/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log('3 is', resp.data)
          this.$store.commit('leftHandAvg', resp.data)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/currentvsall/right-hand/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log('3 is', resp.data)
          this.$store.commit('rightHandAvg', resp.data)
        })
        .catch((err) => console.log(err))

      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/peakdata/left-leg/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          this.$store.commit('leftLegPeak', resp.data)
        })
        .catch((err) => console.log(err))

      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/peakdata/right-leg/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          this.$store.commit('rightLegPeak', resp.data)
        })
        .catch((err) => console.log(err))

      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/peakdata/left-hand/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          this.$store.commit('leftHandPeak', resp.data)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/peakdata/right-hand/${this.pid}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          this.$store.commit('rightHandPeak', resp.data)
        })
        .then(() => this.$router.push({ name: 'dashboard' }))
        .catch((err) => console.log(err))
      console.log(objj)

      // this.$router.push({ name: 'dashboard' })

    },
  },
}
</script>

<style lang="scss">
</style>
