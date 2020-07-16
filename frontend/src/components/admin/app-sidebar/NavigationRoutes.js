export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'profileselect',
      displayName: 'Select Profile',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
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
    {
      name: 'liveData',
      displayName: 'Live Data',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-statistics',
      },
    },
  ],
}
