import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';
import { RoleItem } from './roles';


export interface TenantListQuery extends Pagination {
  ids?: number[]; // ID
  created_at?: Date; // 创建时间
  name?: string; // 名称
}

export interface TenantItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  name?: string; // 名称
  description?: string; // 描述
  meta?: string; // 元数据
  user_amount?: number; // 用户数量
  roles?: RoleItem[]; //  角色
}

export const tableTenantFilters = (): Filter[] => {
  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.String, name: 'name', label: '名称' },
  ]
}

export const tableTenantColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '名称', dataIndex: 'name', slotName: 'name' },
      { title: '描述', dataIndex: 'description', slotName: 'description' },
      { title: '元数据', dataIndex: 'meta', slotName: 'meta' },
      { title: '用户数量', dataIndex: 'user_amount', slotName: 'user_amount', align: 'center' },
      { title: '角色', dataIndex: 'roles', slotName: 'roles', align: 'center' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at', 'meta','description'
    ],
  }
}

export const tableTenantLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'name': '名称',
    'description': '描述',
    'meta': '元数据',
  }
}

export function queryTenantList(params: TenantListQuery) {
  return axios.get<PaginationResp<TenantItem>>('/v1/users/tenants', { params });
}

export function createTenantItem(data: TenantItem) {
  return axios.post(`/v1/users/tenants`, data);
}

export function updateTenantItem(id: number, data: TenantItem) {
  return axios.put(`/v1/users/tenants/${id}`, data);
}

export function getTenantItem(id: number) {
  return axios.get(`/v1/users/tenants/${id}`);
}

export function deleteTenantItem(id: number) {
  return axios.delete(`/v1/users/tenants/${id}`);
}