import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SYSTEM: AppRouteRecordRaw = {
  path: '/systems', name: 'systems', component: DEFAULT_LAYOUT, meta: { title: '系统管理', requiresAuth: true, icon: 'icon-computer', order: 1 },
  children: [
    // 系统管理
    { path: 'routes', name: 'RouteList', component: () => import('@/views/systems/routes/list.vue'), meta: { title: '路由列表', requiresAuth: true, hideInMenu: false } },
    { path: 'routes/view/:id', name: 'RouteView', component: () => import('@/views/systems/routes/view.vue'), meta: { title: '路由详情', requiresAuth: true, hideInMenu: true } },
    { path: 'routes/edit/:id', name: 'RouteEdit', component: () => import('@/views/systems/routes/edit.vue'), meta: { title: '路由编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'routes/create', name: 'RouteCreate', component: () => import('@/views/systems/routes/create.vue'), meta: { title: '路由创建', requiresAuth: true, hideInMenu: true } },

    // 字典管理
    { path: 'dictionaries', name: 'DictionaryList', component: () => import('@/views/systems/dictionaries/list.vue'), meta: { title: '字典列表', requiresAuth: true, hideInMenu: false } },
    { path: 'dictionaries/view/:id', name: 'DictionaryView', component: () => import('@/views/systems/dictionaries/view.vue'), meta: { title: '字典详情', requiresAuth: true, hideInMenu: true } },
    { path: 'dictionaries/edit/:id', name: 'DictionaryEdit', component: () => import('@/views/systems/dictionaries/edit.vue'), meta: { title: '字典编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'dictionaries/create', name: 'DictionaryCreate', component: () => import('@/views/systems/dictionaries/create.vue'), meta: { title: '字典创建', requiresAuth: true, hideInMenu: true } },

    // 菜单管理 
    { path: 'menus', name: 'MenuList', component: () => import('@/views/systems/menus/list.vue'), meta: { title: '菜单列表', requiresAuth: true, hideInMenu: false } },
    { path: 'menus/:id/sub', name: 'MenuSubList', component: () => import('@/views/systems/menus/sub-list.vue'), meta: { title: '子菜单列表', requiresAuth: true, hideInMenu: false } },
    { path: 'menus/view/:id', name: 'MenuView', component: () => import('@/views/systems/menus/view.vue'), meta: { title: '菜单详情', requiresAuth: true, hideInMenu: true } },
    { path: 'menus/edit/:id', name: 'MenuEdit', component: () => import('@/views/systems/menus/edit.vue'), meta: { title: '菜单编辑', requiresAuth: true, hideInMenu: true } },
    { path: 'menus/create', name: 'MenuCreate', component: () => import('@/views/systems/menus/create.vue'), meta: { title: '菜单创建', requiresAuth: true, hideInMenu: true } },

  ],
};

export default SYSTEM;
