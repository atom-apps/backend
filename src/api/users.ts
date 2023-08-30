import { Columns, Filter, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';

export interface UserListQuery extends Pagination {
  createdAt?: Date;
  updatedAt?: Date;
  uuid?: string;
  username?: string;
  email?: string;
  emailVerified?: boolean;
  phone?: string;
  displayName?: string;
  status?: string;
}

export interface UserItem {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  uuid?: string;
  username?: string;
  email?: string;
  email_verified?: boolean;
  phone?: string;
  display_name?: string;
  avatar?: string;
  status?: string;
}

export function queryUserList(params: UserListQuery) {
  return axios.get<PaginationResp<UserItem>>('/v1/users', { params });
}

export function createUserItem(data: UserItem) {
  return axios.post(`/v1/users`, data);
}

export function updateUserItem(id: number, data: UserItem) {
  return axios.put(`/v1/users/${id}`, data);
}

export function getUserItem(id: number) {
  return axios.get(`/v1/users/${id}`);
}

export function getUserItemLabel(id: number) {
  return axios.get(`/v1/users/${id}/label`);
}

export function deleteUserItem(id: number) {
  return axios.delete(`/v1/users/${id}`);
}

export function getUserListQueryFilters() {
  return axios.get<Filter[]>(`/v1/users/filters`);
}

export function getColumns() {
  return axios.get<Columns>(`/v1/users/columns`);
}
