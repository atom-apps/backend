import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface RoleListQuery extends Pagination {
  id?: number; // ID
  created_at?: Date; // 创建时间
  name?: string; // 名称
  slug?: string; // 唯一标识
  description?: string; // 描述
  parent_id?: number; // 父角色
}

export interface RoleItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  name?: string; // 名称
  slug?: string; // 唯一标识
  description?: string; // 描述
  parent_id?: number; // 父角色
}

export const tableRoleFilters = (): Filter[] => {
  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.Date, name: 'created_at', label: '创建时间' },
    { type: FilterType.String, name: 'name', label: '名称' },
    { type: FilterType.String, name: 'slug', label: '唯一标识' },
    { type: FilterType.String, name: 'description', label: '描述' },
    { type: FilterType.Number, name: 'parent_id', label: '父角色' },
  ]
}

export const tableRoleColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '名称', dataIndex: 'name', slotName: 'name' },
      { title: '唯一标识', dataIndex: 'slug', slotName: 'slug' },
      { title: '描述', dataIndex: 'description', slotName: 'description' },
      { title: '父角色', dataIndex: 'parent_id', slotName: 'parent_id' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableRoleLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'name': '名称',
    'slug': '唯一标识',
    'description': '描述',
    'parent_id': '父角色',
  }
}

export function queryRoleList(params: RoleListQuery) {
  return axios.get<PaginationResp<RoleItem>>('/v1/users/roles', { params });
}

export function createRoleItem(data: RoleItem) {
  return axios.post(`/v1/users/roles`, data);
}

export function updateRoleItem(id: number, data: RoleItem) {
  return axios.put(`/v1/users/roles/${id}`, data);
}

export function getRoleItem(id: number) {
  return axios.get(`/v1/users/roles/${id}`);
}

export function deleteRoleItem(id: number) {
  return axios.delete(`/v1/users/roles/${id}`);
}