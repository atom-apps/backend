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
      path: 'list',
      name: 'UserList',
      component: () => import('@/views/users/list/index.vue'),
      meta: {
        locale: 'menu.users.list',
        requiresAuth: true,
      },
    },
    {
      path: 'view/:id',
      name: 'UserView',
      component: () => import('@/views/users/view/index.vue'),
      meta: {
        locale: 'menu.users.view',
        requiresAuth: true,
        hideInMenu: true,
      },
    },
    {
      path: 'edit/:id',
      name: 'UserEdit',
      component: () => import('@/views/users/edit/index.vue'),
      meta: {
        locale: 'menu.users.edit',
        requiresAuth: true,
        hideInMenu: true,
      },
    },
  ],
};

export default DASHBOARD;
