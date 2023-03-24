export const ROUTER_LIST = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: 'Posts',
    path: '/posts',
  },
  {
    label: 'Profile',
    path: '/user/profile',
    requiredLogin: true,
  },
  {
    label: 'Admin',
    path: '/admin',
    requiredLogin: true,
    roleRequire: ['admin'],
  },
]
