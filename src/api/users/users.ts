import { useUserStore } from '@/store';
import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';
import { RoleItem } from './roles';
import { TenantItem } from './tenants';


export interface UserListQuery extends Pagination {
  ids?: number[]; // ID
  created_at?: Date; // 创建时间
  username?: string; // 用户名
  email?: string; // 邮箱
  email_verified?: boolean; // 邮箱是否验证
  phone?: string; // 手机号
  display_name?: string; // 显示名称
  status?: string; // 状态
}

export interface UserItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  uuid?: string; // UUID
  username?: string; // 用户名
  password?: string; // 密码
  email?: string; // 邮箱
  email_verified?: boolean; // 邮箱是否验证
  phone?: string; // 手机号
  display_name?: string; // 显示名称
  avatar?: string; // 头像
  status?: string; // 状态
  tenant_roles?: UserItemTenantRole[]; // 状态
}

export interface UserItemTenantRole {
  role?: RoleItem;
  tenant?: TenantItem;
}

export const tableUserFilters = (): Filter[] => {
  const userStore = useUserStore();

  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.String, name: 'username', label: '用户名' },
    { type: FilterType.String, name: 'display_name', label: '显示名称' },
    { type: FilterType.String, name: 'email', label: '邮箱' },
    { type: FilterType.Bool, name: 'email_verified', label: '邮箱验证' },
    { type: FilterType.String, name: 'phone', label: '手机号' },
    { type: FilterType.String, name: 'tenant', label: '租户',items: userStore.tenants},
    {
      type: FilterType.String, name: 'status', label: '状态', items: [
        { label: '正常', value: '' },
        { label: 'Blocked', value: 'blocked' },
      ]
    },
  ]
}

export const tableUserColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '用户名', dataIndex: 'username', slotName: 'username' },
      { title: '显示名称', dataIndex: 'display_name', slotName: 'display_name' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '更新时间', dataIndex: 'updated_at', slotName: 'updated_at' },
      { title: '删除时间', dataIndex: 'deleted_at', slotName: 'deleted_at' },
      { title: 'UUID', dataIndex: 'uuid', slotName: 'uuid' },
      { title: '邮箱', dataIndex: 'email', slotName: 'email' },
      { title: '手机号', dataIndex: 'phone', slotName: 'phone' },
      { title: '头像', dataIndex: 'avatar', slotName: 'avatar' },
      { title: '状态', dataIndex: 'status', slotName: 'status', align: 'center' },
      { title: '租户/角色', dataIndex: 'tenant_role', slotName: 'tenant_role', align: 'center' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableUserLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'deleted_at': '删除时间',
    'uuid': 'UUID',
    'username': '用户名',
    'password': '密码',
    'email': '邮箱',
    'email_verified': '邮箱验证',
    'phone': '手机号',
    'display_name': '显示名称',
    'avatar': '头像',
    'status': '状态',
  }
}

export function queryUserList(params: UserListQuery) {
  return axios.get<PaginationResp<UserItem>>('/v1/users/users', { params });
}

export function createUserItem(data: UserItem) {
  return axios.post(`/v1/users/users`, data);
}

export function updateUserItem(id: number, data: UserItem) {
  return axios.put(`/v1/users/users/${id}`, data);
}

export function getUserItem(id: number) {
  return axios.get(`/v1/users/users/${id}`);
}

export function deleteUserItem(id: number) {
  return axios.delete(`/v1/users/users/${id}`);
}