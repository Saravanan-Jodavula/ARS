<template>
  <div class="charts">
    <div class="row">
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('User Minimum vs Total Minimum')"
        >
          <va-chart :data="horizontalBarChartDataAvg" type="horizontal-bar"/>
        </va-card>
      </div>
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('User average vs Total average')"
        >
          <va-chart :data="horizontalBarChartDataAvg" type="horizontal-bar"/>
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
                  <va-button v-on:click="gett">
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
                <va-chart :data="chartData" :key="sex" type="vertical-bar"/>
              </div>
            </va-card>
          </va-card>
        </va-card>
      </div>

    </div>
    <div class="row">
      <div class="flex md12 xs12">
        <va-card
          class="chart-widget"
          :title="$t('charts.lineChart')"
        >
          <va-chart :data="lineChartData" type="line"/>
        </va-card>
      </div>
    </div>

    <div class="row">
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('Current User Vs All Users Average')"
        >
          <va-chart :data="pieChartData" type="pie"/>
        </va-card>
      </div>
      <div class="flex md6 xs12">
        <va-card
          class="chart-widget"
          :title="$t('User Maximum vs Total Maximum')"
        >
          <va-chart :data="horizontalBarChartDataAvg" type="horizontal-bar"/>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getLineChartData } from '../../../data/charts/LineChartData'
import { getPieChartData } from '../../../data/charts/PieChartData'
import { getDonutChartData } from '../../../data/charts/DonutChartData'

export default {
  name: 'charts',
  data () {
    return {
      sex: true,
      twentyInstances: false,
      lineChartData: getLineChartData(this.$themes),
      pieChartData: getPieChartData(this.$themes),
      donutChartData: getDonutChartData(this.$themes),
      limbs: ['left-leg', 'right-leg', 'left-hand', 'right-hand'],
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
      horizontalBarChartDataAvg: {
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

    }
  },
  computed: {
    chartData () {
      return this.verticalBarChartData
    },
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
      this.sex = !this.sex
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
