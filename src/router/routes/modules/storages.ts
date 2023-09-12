import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const STORAGES: AppRouteRecordRaw = {
  path: '/storages', name: 'storages', component: DEFAULT_LAYOUT, meta: { title: '存储管理', requiresAuth: true, icon: 'icon-image', order: 0 },
  children: [
            // 文件管理
            { path: 'filesystems', name: 'FilesystemList', component: () => import('@/views/storages/filesystems/list.vue'), meta: { title: '文件管理列表', requiresAuth: true, hideInMenu: false }},
            { path: 'filesystems/view/:id', name: 'FilesystemView', component: () => import('@/views/storages/filesystems/view.vue'), meta: { title: '文件管理详情', requiresAuth: true, hideInMenu: true } },
            { path: 'filesystems/edit/:id', name: 'FilesystemEdit', component: () => import('@/views/storages/filesystems/edit.vue'), meta: { title: '文件管理编辑', requiresAuth: true, hideInMenu: true } },
            { path: 'filesystems/create', name: 'FilesystemCreate', component: () => import('@/views/storages/filesystems/create.vue'), meta: { title: '文件管理创建', requiresAuth: true, hideInMenu: true } },
  ],
};

export default STORAGES;
