import { useUserStore } from '@/store';
import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';
import { RoleItem } from './roles';
import { TenantItem } from './tenants';


export interface PermissionListQuery extends Pagination {
  id?: number; // ID
  created_at?: Date; // 创建时间
  tenant_id?: number; // 租户ID
  tenant?: TenantItem; // 租户ID
  role_id?: number; // 角色ID
  role?: RoleItem; // 角色ID
  path?: string; // 路由
  action?: string; // 请求方式
}

export interface PermissionItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  tenant_id?: number; // 租户ID
  role_id?: number; // 角色ID
  path?: string; // 路由
  action?: string; // 请求方式
}

export interface PermissionTree {
  id: number;
  name: string;
  method: string;
  path: string;
  parent_id: number;
  children?: PermissionTree[];
}

export const actionList = () => {
  return [
    { label: actionDesc('GET'), value: "GET" },
    { label: actionDesc('POST'), value: "POST" },
    { label: actionDesc('PUT'), value: "PUT" },
    { label: actionDesc('DELETE'), value: "DELETE" },
  ]
}

export const tablePermissionFilters = (): Filter[] => {
  const userStore = useUserStore()
  return [
    { type: FilterType.Number, name: 'tenant_id', label: '租户', items: userStore.tenants },
    { type: FilterType.Number, name: 'role_id', label: '角色', items: userStore.roles },
    { type: FilterType.String, name: 'path', label: '路由' },
    { type: FilterType.String, name: 'action', label: '请求方式', items: actionList() },
  ]
}

export const actionDesc = (action: string) => {
  switch (action) {
    case 'GET':
      return 'View'
    case 'POST':
      return 'Create'
    case 'PUT':
      return 'Update'
    case 'DELETE':
      return 'Delete'
    default:
      return 'Unknown'
  }
}

export const tablePermissionColumns = (): Columns => {
  return {
    columns: [
      // { title: '租户ID', dataIndex: 'tenant_id', slotName: 'tenant_id' },
      { title: '名称', dataIndex: 'name', slotName: 'name' },
      { title: '路由', dataIndex: 'path', slotName: 'path' },
      { title: '权限', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tablePermissionLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'tenant_id': '租户ID',
    'role_id': '角色ID',
    'path': '路由',
    'action': '请求方式',
  }
}

export function queryPermissionList(params: PermissionListQuery) {
  return axios.get<PaginationResp<PermissionItem>>('/v1/users/permissions', { params });
}

export function getPermissionTree() {
  return axios.get<PermissionTree[]>('/v1/users/permissions/tree');
}

export function createPermissionItem(data: PermissionItem) {
  return axios.post(`/v1/users/permissions`, data);
}

export function updatePermissionItem(id: number, data: PermissionItem) {
  return axios.put(`/v1/users/permissions/${id}`, data);
}

export function getPermissionItem(id: number) {
  return axios.get(`/v1/users/permissions/${id}`);
}

export function deletePermissionItem(id: number) {
  return axios.delete(`/v1/users/permissions/${id}`);
}

export function attachUsers(tenant: number, role: number, users: number[]) {
  return axios.put(`/v1/users/permissions/attach/${role}/${tenant}`, { ids: users });
}

export function detachUsers(tenant: number, role: number, users: number[]) {
  return axios.put(`/v1/users/permissions/detach/${role}/${tenant}`, { ids: users });
}
