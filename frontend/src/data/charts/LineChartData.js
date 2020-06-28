import { hex2rgb } from '../../services/vuestic-ui'

export const getLineChartData = (themes) => {
  var generatedData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    datasets: [
      {
        label: 'global data',
        backgroundColor: hex2rgb(themes.primary, 0.6).css,
        borderColor: 'transparent',
        data: [10, 20, 30, 40, 30, 20],
      },
      {
        label: 'userdata',
        backgroundColor: hex2rgb(themes.info, 0.6).css,
        borderColor: 'transparent',
        data: [30, 60, 40, 50, 20, 10],
      },
    ],
  }

  return generatedData
}
