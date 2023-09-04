import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/systems', name: 'systems', component: DEFAULT_LAYOUT, meta: { title: '系统管理', requiresAuth: true, icon: 'icon-computer', order: 1 },
  children: [
    // 系统管理
    { path: 'routes', name: 'RouteList', component: () => import('@/views/systems/routes/list.vue'), meta: { title: '路由列表', requiresAuth: true }, },
    { path: 'routes/view/:id', name: 'RouteView', component: () => import('@/views/systems/routes/view.vue'), meta: { title: '路由详情', requiresAuth: true, hideInMenu: true } },
    { path: 'routes/edit/:id', name: 'RouteEdit', component: () => import('@/views/systems/routes/edit.vue'), meta: { title: '路由编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'routes/create', name: 'RouteCreate', component: () => import('@/views/systems/routes/create.vue'), meta: { title: '路由创建', requiresAuth: true, hideInMenu: true } },


  ],
};

export default SYSTEM;
