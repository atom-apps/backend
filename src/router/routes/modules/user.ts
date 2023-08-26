import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/users',
  name: 'user',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.users',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0,
  },
  children: [
    {
      path: '',
      name: 'UserList',
      component: () => import('@/views/users/list/index.vue'),
      meta: {
        locale: 'menu.users.list',
        requiresAuth: true,
      },
    },
  ],
};

export default DASHBOARD;
