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
