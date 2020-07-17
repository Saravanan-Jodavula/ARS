<template>
  <div class="charts">
    <div class="row">
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('User Minimum vs Total Minimum')"
        >
          <va-chart :data="horizontalBarChartDataMin" :key="this.$store.state.refresh2" type="horizontal-bar"/>
        </va-card>
      </div>
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('User average vs Total average')"
        >
          <va-chart :data="horizontalBarChartDataAvg" :key="this.$store.state.refresh3" type="horizontal-bar"/>
        </va-card>
      </div>

    </div>
    <div class="row">
      <div class="flex md12 xs12">
        <va-card :title="$t(`${this.limb}`)">
          <form @submit="gett">
            <div class="row">
              <div class="flex lg12 md12 sm12 xs12">
                <va-select
                  :label="$t('choose one of the following')"
                  v-model="limb"
                  :options="this.limbs"
                />
                <div class="flex lg6 md6 sm6 xs12">
                  <va-button @click.prevent="gett">
                    Get details
                  </va-button>
                </div>
              </div>
            </div>
          </form>
        </va-card>
      </div>
      <div class="flex md12 xs12">
        <va-card :title="$t('Twenty Instances of current session')">
          <va-card
            v-if="twentyInstances"
          >
            <va-card
              :title="$t('Left Hand 20 Instances')"
            >
              <div ref="myChart">
                <va-chart :data="chartData" :key="instanceFlag" type="vertical-bar"/>
              </div>
            </va-card>
          </va-card>
        </va-card>
      </div>

    </div>
    <div class="row">
      <div class="flex md12 xs12">
        <va-card>
          <form @submit="gett">
            <div class="row">
              <div class="flex lg12 md12 sm12 xs12">
                <va-date-picker
                  :label="$t('Date')"
                  v-model="date"
                />
                <div class="flex lg6 md6 sm6 xs12">
                  <va-button @click.prevent="gett2">
                    Get details
                  </va-button>
                </div>
              </div>
            </div>
          </form>
        </va-card>
        <br>
        <va-card
          class="chart-widget"
          :title="$t('user average vs total averages on a given day')"
        >
          <va-chart v-if="dateFlag" :key="instanceFlag2" :data="lineChartData" type="line"/>
        </va-card>
      </div>
    </div>

    <div class="row">
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('Current User Vs All Users Average')"
        >
          <va-chart :data="verticalBarChartDataAvg" :key="this.$store.state.instanceFlag" type="vertical-bar"/>
        </va-card>
      </div>
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('User Maximum vs Total Maximum')"
        >
          <va-chart :data="horizontalBarChartDataMax" :key="this.$store.state.refresh" type="horizontal-bar"/>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { hex2rgb } from '../../../services/vuestic-ui'
export default {
  name: 'charts',
  data () {
    return {
      date: null,
      refresh: false,
      refresh1: false,
      refresh2: false,
      refresh3: false,
      pageRefresh: false,
      instanceFlag: true,
      instanceFlag2: true,
      dateFlag: false,
      twentyInstances: false,
      lineChartData: {
        labels: ['upper-quadrant', 'lower-quadrant', 'sideways', 'diagonal'],
        datasets: [
          {
            label: 'global data',
            backgroundColor: hex2rgb(this.$themes.primary, 0.6).css,
            borderColor: 'transparent',
            data: [],
          },
          {
            label: 'userdata',
            backgroundColor: hex2rgb(this.$themes.info, 0.6).css,
            borderColor: 'transparent',
            data: [],
          },
        ],
      },

      limbs: ['upper-quadrant', 'lower-quadrant', 'sideways', 'diagonal'],
      limb: null,
      verticalBarChartData: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        datasets: [
          {
            label: null,
            backgroundColor: this.$themes.primary,
            borderColor: 'transparent',
            data: [],
          },
        ],
      },
      verticalBarChartDataAvgs: {
        // labels: this.$store.state.labelAverage,
        labels: ['upper-quadrant', 'lower-quadrant', 'sideways', 'diagonal'],
        datasets: [
          {
            label: 'current average',
            backgroundColor: this.$themes.primary,
            borderColor: 'transparent',
            data: this.$store.state.currentAvg,
          },
          {
            label: 'All time average',
            backgroundColor: this.$themes.danger,
            borderColor: 'transparent',
            data: this.$store.state.totalAvg,
          },
        ],
      },
      horizontalBarChartDataAvgs: {
        labels: this.$store.state.avgLabels,
        datasets: [
          {
            label: 'User Data',
            backgroundColor: this.$themes.warning,
            borderColor: 'transparent',
            data: this.$store.state.avgDataUsers,
          },
          {
            label: 'Total Data',
            backgroundColor: this.$themes.danger,
            borderColor: 'transparent',
            data: this.$store.state.avgDataTotal,
          },
        ],
      },
      horizontalBarChartDataMins: {
        labels: ['upper-quadrant', 'lower-quadrant', 'sideways', 'diagonal'],
        datasets: [
          {
            label: 'User Data',
            backgroundColor: this.$themes.warning,
            borderColor: 'transparent',
            data: this.$store.state.userMin,
          },
          {
            label: 'Total Data',
            backgroundColor: this.$themes.danger,
            borderColor: 'transparent',
            data: this.$store.state.globalMin,
          },
        ],
      },
      horizontalBarChartDataMaxs: {
        labels: ['upper-quadrant', 'lower-quadrant', 'sideways', 'diagonal'],
        datasets: [
          {
            label: 'User Data',
            backgroundColor: this.$themes.warning,
            borderColor: 'transparent',
            data: this.$store.state.userMax,
          },
          {
            label: 'Total Data',
            backgroundColor: this.$themes.danger,
            borderColor: 'transparent',
            data: this.$store.state.globalMax,
          },
        ],
      },
    }
  },
  computed: {
    chartData () {
      return this.verticalBarChartData
    },
    horizontalBarChartDataAvg () {
      return this.horizontalBarChartDataAvgs
    },
    verticalBarChartDataAvg () {
      return this.verticalBarChartDataAvgs
    },
    horizontalBarChartDataMin () {
      return this.horizontalBarChartDataMins
    },
    horizontalBarChartDataMax () {
      return this.horizontalBarChartDataMaxs
    },
  },
  beforeCreate () {
    this.$store.commit('relod')
  },
  methods: {
    refreshData () {
      return this.verticalBarChartData
    },
    async gett () {
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/currentsession/`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          this.verticalBarChartData.datasets[0].data = []
          console.log('array is,  ', this.verticalBarChartData.datasets[0].data)
          var abc = [...response.data.data]
          this.verticalBarChartData.datasets[0].label = this.limb
          abc.forEach(element => {
            console.log(element.session_data[`${this.limb}`])
            this.verticalBarChartData.datasets[0].data.push(element.session_data[`${this.limb}`])
          })
        //  console.log(response.data.data)
        })
        .catch((err) => console.log(err))
      this.twentyInstances = true
      this.instanceFlag = !this.instanceFlag
      this.refresh1 = !this.refresh1
      this.refresh2 = !this.refresh2
      this.refresh3 = !this.refresh3
    },
    async gett2 () {
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/usersavg/upper-quadrant/${this.$store.state.pid}/${this.date}:`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          this.lineChartData.datasets[0].data.push(response.data.totalAverage)
          this.lineChartData.datasets[1].data.push(response.data.userAverage)
          console.log(response.data)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/usersavg/lower-quadrant/${this.$store.state.pid}/${this.date}:`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          this.lineChartData.datasets[0].data.push(response.data.totalAverage)
          this.lineChartData.datasets[1].data.push(response.data.userAverage)
          console.log(response.data)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/usersavg/sideways/${this.$store.state.pid}/${this.date}:`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          this.lineChartData.datasets[0].data.push(response.data.totalAverage)
          this.lineChartData.datasets[1].data.push(response.data.userAverage)
          console.log(response.data)
        })
        .catch((err) => console.log(err))
      await axios.get(`${process.env.VUE_APP_BACKEND_URL}/session/usersavg/diagonal/${this.$store.state.pid}/${this.date}:`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          this.lineChartData.datasets[0].data.push(response.data.totalAverage)
          this.lineChartData.datasets[1].data.push(response.data.userAverage)
          console.log(response.data)
        })
        .catch((err) => console.log(err))
      this.dateFlag = true
      this.instanceFlag2 = !this.instanceFlag
      this.refresh1 = !this.refresh1
      this.refresh2 = !this.refresh2
      this.refresh3 = !this.refresh3
    },
  },
}
</script>

<style lang="scss">
.chart-widget {
  .va-card__body {
    height: 550px;
  }
}
</style>
