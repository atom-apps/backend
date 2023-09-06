import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard', name: 'dashboard', component: DEFAULT_LAYOUT, meta: { title: '仪表台', requiresAuth: true, icon: 'icon-dashboard', order: 0 },
  children: [
    { path: 'workplace', name: 'workplace', component: () => import('@/views/dashboard/workplace/index.vue'), meta: { title: '工作空间', requiresAuth: true, icon: 'icon-computer' } },
  ],
};

export default DASHBOARD;
