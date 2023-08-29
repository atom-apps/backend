import { Filter, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';
import { Columns } from './../types/global';

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
  createdAt?: Date;
  updatedAt?: Date;
  uuid?: string;
  username?: string;
  email?: string;
  emailVerified?: boolean;
  phone?: string;
  displayName?: string;
  avatar?: string;
  status?: string;
}

export function queryUserList(params: UserListQuery) {
  return axios.get<PaginationResp<UserItem>>('/v1/users', { params });
}


export function getUserProfile(id: number) {
  return axios.get(`/v1/users/${id}`);
}

export function getUserProfileLabel(id: number) {
  return axios.get(`/v1/users/${id}/label`);
}

export function deleteUser(id: number) {
  return axios.delete(`/v1/users/${id}`);
}

export function getUserListQueryFilters() {
  return axios.get<Filter[]>(`/v1/users/filters`);
}

export function getColumns() {
  return axios.get<Columns>(`/v1/users/columns`);
}
