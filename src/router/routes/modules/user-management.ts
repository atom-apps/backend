import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/user-management', name: 'user-management', component: DEFAULT_LAYOUT, meta: { title: '用户管理', requiresAuth: true, icon: 'icon-user', order: 0 },
  children: [
    // user
    { path: 'users', name: 'UserList', component: () => import('@/views/user-management/users/list.vue'), meta: { title: '用户列表', requiresAuth: true } },
    { path: 'users/view/:id', name: 'UserView', component: () => import('@/views/user-management/users/view.vue'), meta: { title: '用户详情', requiresAuth: true, hideInMenu: true } },
    { path: 'users/edit/:id', name: 'UserEdit', component: () => import('@/views/user-management/users/edit.vue'), meta: { title: '用户编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'users/create', name: 'UserCreate', component: () => import('@/views/user-management/users/create.vue'), meta: { title: '用户创建', requiresAuth: true, hideInMenu: true } },

    // role
    { path: 'roles', name: 'RoleList', component: () => import('@/views/user-management/roles/list.vue'), meta: { title: '角色列表', requiresAuth: true }, },
    { path: 'roles/view/:id', name: 'RoleView', component: () => import('@/views/user-management/roles/view.vue'), meta: { title: '角色详情', requiresAuth: true, hideInMenu: true } },
    { path: 'roles/edit/:id', name: 'RoleEdit', component: () => import('@/views/user-management/roles/edit.vue'), meta: { title: '角色编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'roles/create', name: 'RoleCreate', component: () => import('@/views/user-management/roles/create.vue'), meta: { title: '角色创建', requiresAuth: true, hideInMenu: true } },
  ],
};

export default DASHBOARD;
