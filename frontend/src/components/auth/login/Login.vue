<template>
  <form @submit.prevent="login">
    <va-input
      v-model="email"
      :label="$t('email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />
    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />
    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { HollowDotsSpinner } from 'epic-spinners'
export default {
    beforeCreate () {
      axios.get(`${process.env.VUE_APP_BACKEND_URL}/endpoint`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {this.$store.commit('rpiEndpoint', response.data.endpoint)})
        .catch((error) => { console.log(error); })
  },
  name: 'login',
  data () {
    return {
      email: null,
      password: null,
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      loader: false,
      HollowDotsSpinner: HollowDotsSpinner,
    }
  },
  methods: {
    login: function () {
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/login/`, { username: this.email, password: this.password }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((resp) => {
          console.log(resp.data.isLoggedin)
          if (resp.data.isLoggedin === true) {
            this.$router.push({ name: 'profileselect' })
          } else {
            alert('wrong creds')
          }
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>

<style lang="scss">
</style>
