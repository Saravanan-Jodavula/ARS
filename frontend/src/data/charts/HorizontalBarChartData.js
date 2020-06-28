export const getHorizontalBarChartData = (themes) => ({
  labels: ['left-hand', 'right-hand', 'left-leg', 'right-leg'],
  datasets: [
    {
      label: 'My Average',
      backgroundColor: themes.warning,
      borderColor: 'transparent',
      data: [80, 90, 50, 70],
    },
    {
      label: 'Total Average',
      backgroundColor: themes.danger,
      borderColor: 'transparent',
      data: [30, 30, 20, 40],
    },
  ],
})
