import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/users', name: 'users', component: DEFAULT_LAYOUT, meta: { title: '用户管理', requiresAuth: true, icon: 'icon-user', order: 0 },
  children: [
    // user
    { path: 'users', name: 'UserList', component: () => import('@/views/users/users/list.vue'), meta: { title: '用户列表', requiresAuth: true } },
    { path: 'users/view/:id', name: 'UserView', component: () => import('@/views/users/users/view.vue'), meta: { title: '用户详情', requiresAuth: true, hideInMenu: true } },
    { path: 'users/edit/:id', name: 'UserEdit', component: () => import('@/views/users/users/edit.vue'), meta: { title: '用户编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'users/create', name: 'UserCreate', component: () => import('@/views/users/users/create.vue'), meta: { title: '用户创建', requiresAuth: true, hideInMenu: true } },

    // role
    { path: 'roles', name: 'RoleList', component: () => import('@/views/users/roles/list.vue'), meta: { title: '角色列表', requiresAuth: true }, },
    { path: 'roles/view/:id', name: 'RoleView', component: () => import('@/views/users/roles/view.vue'), meta: { title: '角色详情', requiresAuth: true, hideInMenu: true } },
    { path: 'roles/edit/:id', name: 'RoleEdit', component: () => import('@/views/users/roles/edit.vue'), meta: { title: '角色编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'roles/create', name: 'RoleCreate', component: () => import('@/views/users/roles/create.vue'), meta: { title: '角色创建', requiresAuth: true, hideInMenu: true } },

    // tenants
    { path: 'tenants', name: 'TenantList', component: () => import('@/views/users/tenants/list.vue'), meta: { title: '租户列表', requiresAuth: true }, },
    { path: 'tenants/view/:id', name: 'TenantView', component: () => import('@/views/users/tenants/view.vue'), meta: { title: '租户详情', requiresAuth: true, hideInMenu: true } },
    { path: 'tenants/edit/:id', name: 'TenantEdit', component: () => import('@/views/users/tenants/edit.vue'), meta: { title: '租户编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'tenants/create', name: 'TenantCreate', component: () => import('@/views/users/tenants/create.vue'), meta: { title: '租户创建', requiresAuth: true, hideInMenu: true } },

    // sessions
    { path: 'sessions', name: 'SessionList', component: () => import('@/views/users/sessions/list.vue'), meta: { title: '在线列表', requiresAuth: true }, },
    { path: 'sessions/view/:id', name: 'SessionView', component: () => import('@/views/users/sessions/view.vue'), meta: { title: '在线详情', requiresAuth: true, hideInMenu: true } },
    { path: 'sessions/edit/:id', name: 'SessionEdit', component: () => import('@/views/users/sessions/edit.vue'), meta: { title: '在线编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'sessions/create', name: 'SessionCreate', component: () => import('@/views/users/sessions/create.vue'), meta: { title: '在线创建', requiresAuth: true, hideInMenu: true } },
  ],
};

export default DASHBOARD;
