<template>
  <va-card >
    <va-card
      :title="$t('User Average vs Total Average')"
    >
      <va-button>
        Start Session
      </va-button>
      <va-button color="danger">
        End Session
      </va-button>
    </va-card>
    <br>
    <va-card :title="$t(`${this.limb}`)">
      <form @submit="gett">
        <div class="row">
          <div class="flex lg12 md12 sm12 xs12">
            <va-input
              :label="$t('Name')"
              v-model="form_data.name"
            />
            <va-input
              :label="$t('unique id')"
              v-model="form_data.unique_id"
            />
            <va-input
              :label="$t('Height')"
              v-model="form_data.height"
            />
            <va-input
              :label="$t('Weight')"
              v-model="form_data.weight"
            />
            <va-input
              :label="$t('Age')"
              v-model="form_data.age"
            />
            <va-input
              :label="$t('Disability')"
              v-model="form_data.disability_info.type"
            />
            <div class="flex lg6 md6 sm6 xs12">
              <va-button @click.prevent="submit">
                Create
              </va-button>
            </div>
          </div>
        </div>
      </form>
    </va-card>
  </va-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'charts',
  beforeCreate () {
    axios.get(`${process.env.VUE_APP_BACKEND_URL}/profile/${this.$store.state.pid}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => console.log(response.data))
  },
  data () {
    return {
      form_data: {
        age: null,
        disability_info: {
          type: null,
        },
        height: null,
        name: null,
        unique_id: null,
        weight: null,
      },
    }
  },
  methods: {
    submit () {
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/profile/`, this.form_data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => { console.log(response.data); alert(response.data.message)})
        .catch((error) => { console.log(error); alert('there was some error in creating, Please try again') })
    },
  },
}
</script>

<style lang="scss">
  .row-equal .flex {
    .va-card {
      height: 100%;
    }
  }

  .dashboard {
    .va-card {
      margin-bottom: 0 !important;
    }
  }
</style>
