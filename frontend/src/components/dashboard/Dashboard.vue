<template>
  <va-card>
    <h1>Henlo</h1>
    <va-card
      class="chart-widget"
      :title="$t('User Average vs Total Average')"
    >
      <va-chart :data="horizontalBarChartDataAvg" type="horizontal-bar"/>
    </va-card>
    <br>
    <va-card
      class="chart-widget"
      :title="$t('User Max vs Total Max')"
    >
      <va-chart :data="horizontalBarChartDataMax" type="horizontal-bar"/>
    </va-card>
    <br>
    <va-card
      class="chart-widget"
      :title="$t('User Min vs Total Min')"
    >
      <va-chart :data="horizontalBarChartDataMin" type="horizontal-bar"/>
    </va-card>
  </va-card>
</template>

<script>
import { getLineChartData } from '../../data/charts/LineChartData'
import { getPieChartData } from '../../data/charts/PieChartData'
import { getDonutChartData } from '../../data/charts/DonutChartData'
import { getVerticalBarChartData } from '../../data/charts/VerticalBarChartData'

export default {
  name: 'charts',
  mounted () {
    this.$forceUpdate()
  },
  data () {
    return {
      pieChartData: getPieChartData(this.$themes),
      donutChartData: getDonutChartData(this.$themes),
      verticalBarChartData: getVerticalBarChartData(this.$themes),
      horizontalBarChartDataAvg: {
        labels: this.$store.state.avgLabels,
        datasets: [
          {
            label: 'My Average',
            backgroundColor: this.$themes.warning,
            borderColor: 'transparent',
            data: this.$store.state.avgDataUsers,
          },
          {
            label: 'Total Average',
            backgroundColor: this.$themes.danger,
            borderColor: 'transparent',
            data: this.$store.state.avgDataTotal,
          },
        ],
      },
      horizontalBarChartDataMax: {
        labels: ['left-hand', 'right-hand', 'left-leg', 'right-leg'],
        datasets: [
          {
            label: 'My Max',
            backgroundColor: this.$themes.warning,
            borderColor: 'transparent',
            data: [80, 90, 50, 70],
          },
          {
            label: 'Total Average',
            backgroundColor: this.$themes.danger,
            borderColor: 'transparent',
            data: [30, 30, 20, 40],
          },
        ],
      },
      horizontalBarChartDataMin: {
        labels: ['left-hand', 'right-hand', 'left-leg', 'right-leg'],
        datasets: [
          {
            label: 'My Max',
            backgroundColor: this.$themes.warning,
            borderColor: 'transparent',
            data: [80, 90, 50, 70],
          },
          {
            label: 'Total Average',
            backgroundColor: this.$themes.danger,
            borderColor: 'transparent',
            data: [30, 30, 20, 40],
          },
        ],
      },
    }
  },
  methods: {
    refreshData () {
      this.lineChartData = getLineChartData(this.$themes)
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
