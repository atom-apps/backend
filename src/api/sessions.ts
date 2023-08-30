import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface SessionListQuery extends Pagination {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  user_id?: number; // 用户ID
  session_id?: string; // 会话ID
  expire_at?: string; // 过期时间
}

export interface SessionItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  user_id?: number; // 用户ID
  session_id?: string; // 会话ID
  expire_at?: string; // 过期时间
}

export const tableSessionFilters = (): Filter[] => {
  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.Number, name: 'user_id', label: '用户' },
    { type: FilterType.String, name: 'session_id', label: '会话ID' },
  ]
}

export const tableSessionColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '更新时间', dataIndex: 'updated_at', slotName: 'updated_at' },
      { title: '用户ID', dataIndex: 'user_id', slotName: 'user_id' },
      { title: '用户名', dataIndex: 'user.username', slotName: 'user_username' },
      { title: '昵称', dataIndex: 'user.display_name', slotName: 'user_displayname' },
      { title: '会话ID', dataIndex: 'session_id', slotName: 'session_id' },
      { title: '过期时间', dataIndex: 'expire_at', slotName: 'expire_at' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableSessionLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'user_id': '用户ID',
    'session_id': '会话ID',
    'expire_at': '过期时间',
  }
}

export function querySessionList(params: SessionListQuery) {
  return axios.get<PaginationResp<SessionItem>>('/v1/users/sessions', { params });
}

export function createSessionItem(data: SessionItem) {
  return axios.post(`/v1/users/sessions`, data);
}

export function updateSessionItem(id: number, data: SessionItem) {
  return axios.put(`/v1/users/sessions/${id}`, data);
}

export function getSessionItem(id: number) {
  return axios.get(`/v1/users/sessions/${id}`);
}

export function deleteSessionItem(id: number) {
  return axios.delete(`/v1/users/sessions/${id}`);
}