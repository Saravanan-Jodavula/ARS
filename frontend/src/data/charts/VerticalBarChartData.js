export const getVerticalBarChartData = (themes) => ({
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  datasets: [
    {
      label: 'USA',
      backgroundColor: themes.primary,
      borderColor: 'transparent',
      data: [50, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11, 50, 20, 12, 39, 10, 40, 39, 80],
    },
  ],
})
