import { Columns, Filter, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';

export interface RoleListQuery extends Pagination {
  name?: string;
  slug?: string;
  parent_id?: number;
}

export interface RoleItem {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
  parent_id?: number;
  parent?: RoleItem;
}

export function queryRoleList(params: RoleListQuery) {
  return axios.get<PaginationResp<RoleItem>>('/v1/users/roles', { params });
}

export function createRoleItem(data: RoleItem) {
  return axios.post('/v1/users/roles', data);
}

export function updateRoleItem(id: number, data: RoleItem) {
  return axios.put(`/v1/users/roles/${id}`, data);
}

export function deleteRoleItem(id: number) {
  return axios.delete(`/v1/users/roles/${id}`);
}

export function getRoleItem(id: number) {
  return axios.get<RoleItem>(`/v1/users/roles/${id}`);
}

export function getRoleItemLabel(id: number) {
  return axios.get(`/v1/users/roles/${id}/label`);
}

export function getRoleListQueryFilters() {
  return axios.get<Filter[]>(`/v1/users/roles/filters`);
}

export function getRoleListColumns() {
  return axios.get<Columns>(`/v1/users/roles/columns`);
}