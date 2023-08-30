import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface PermissionRuleListQuery extends Pagination {
  id?: number; // 
  ptype?: string; // 
  v0?: string; // 
  v1?: string; // 
  v2?: string; // 
  v3?: string; // 
  v4?: string; // 
  v5?: string; // 
}

export interface PermissionRuleItem {
  id?: number; // 
  ptype?: string; // 
  v0?: string; // 
  v1?: string; // 
  v2?: string; // 
  v3?: string; // 
  v4?: string; // 
  v5?: string; // 
}

export const tablePermissionRuleFilters = (): Filter[] => {
  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.String, name: 'ptype', label: '' },
    { type: FilterType.String, name: 'v0', label: '' },
    { type: FilterType.String, name: 'v1', label: '' },
    { type: FilterType.String, name: 'v2', label: '' },
    { type: FilterType.String, name: 'v3', label: '' },
    { type: FilterType.String, name: 'v4', label: '' },
    { type: FilterType.String, name: 'v5', label: '' }, 
  ]
}

export const tablePermissionRuleColumns = (): Columns => {
  return {
    columns: [
      { title: '', dataIndex: 'id', slotName: 'id' },
      { title: '', dataIndex: 'ptype', slotName: 'ptype' },
      { title: '', dataIndex: 'v0', slotName: 'v0' },
      { title: '', dataIndex: 'v1', slotName: 'v1' },
      { title: '', dataIndex: 'v2', slotName: 'v2' },
      { title: '', dataIndex: 'v3', slotName: 'v3' },
      { title: '', dataIndex: 'v4', slotName: 'v4' },
      { title: '', dataIndex: 'v5', slotName: 'v5' }, 
      { title: '操作', dataIndex: 'operations' ,slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tablePermissionRuleLabels = (): Record<string, string> => {
  return {
    'id': '',
    'ptype': '',
    'v0': '',
    'v1': '',
    'v2': '',
    'v3': '',
    'v4': '',
    'v5': '', 
  }
}

export function queryPermissionRuleList(params: PermissionRuleListQuery) {
  return axios.get<PaginationResp<PermissionRuleItem>>('/v1/users/permissions', { params });
}

export function createPermissionRuleItem(data: PermissionRuleItem) {
  return axios.post(`/v1/users/permissions`, data);
}

export function updatePermissionRuleItem(id: number, data: PermissionRuleItem) {
  return axios.put(`/v1/users/permissions/${id}`, data);
}

export function getPermissionRuleItem(id: number) {
  return axios.get(`/v1/users/permissions/${id}`);
}

export function deletePermissionRuleItem(id: number) {
  return axios.delete(`/v1/users/permissions/${id}`);
}