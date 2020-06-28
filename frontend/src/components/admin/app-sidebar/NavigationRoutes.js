export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      name: 'charts',
      displayName: 'Statistics',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-statistics',
      },
    },
  ],
}