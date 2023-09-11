import { Columns, Filter, FilterType, Pagination } from '@/types/global';
import axios from 'axios';


export interface UserAddressListQuery extends Pagination {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  deleted_at?: Date; // 删除时间
  user_id?: number; // 用户ID
  code?: string; // 行政区划代码
  town?: string; // 街道
  detail?: string; // 详细地址
  name?: string; // 姓名
  phone?: string; // 联系电话
  zip_code?: string; // 邮编
}

export interface UserAddressItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  user_id?: number; // 用户ID
  code?: string; // 行政区划代码
  town?: string; // 街道
  detail?: string; // 详细地址
  name?: string; // 姓名
  phone?: string; // 联系电话
  zip_code?: string; // 邮编
}

export const tableUserAddressFilters = (): Filter[] => {
  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.Date, name: 'created_at', label: '创建时间' },
    { type: FilterType.Date, name: 'updated_at', label: '更新时间' },
    { type: FilterType.Date, name: 'deleted_at', label: '删除时间' },
    { type: FilterType.Number, name: 'user_id', label: '用户ID' },
    { type: FilterType.String, name: 'code', label: '行政区划代码' },
    { type: FilterType.String, name: 'town', label: '街道' },
    { type: FilterType.String, name: 'detail', label: '详细地址' },
    { type: FilterType.String, name: 'name', label: '姓名' },
    { type: FilterType.String, name: 'phone', label: '联系电话' },
    { type: FilterType.String, name: 'zip_code', label: '邮编' },
  ]
}

export const tableUserAddressColumns = (): Columns => {
  return {
    columns: [
      { title: '行政区划代码', dataIndex: 'code', slotName: 'code' },
      { title: '街道', dataIndex: 'town', slotName: 'town' },
      { title: '详细地址', dataIndex: 'detail', slotName: 'detail' },
      { title: '姓名', dataIndex: 'name', slotName: 'name' },
      { title: '联系电话', dataIndex: 'phone', slotName: 'phone' },
      { title: '邮编', dataIndex: 'zip_code', slotName: 'zip_code' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '更新时间', dataIndex: 'updated_at', slotName: 'updated_at' },
      { title: '删除时间', dataIndex: 'deleted_at', slotName: 'deleted_at' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableUserAddressLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'deleted_at': '删除时间',
    'user_id': '用户ID',
    'code': '行政区划代码',
    'town': '街道',
    'detail': '详细地址',
    'name': '姓名',
    'phone': '联系电话',
    'zip_code': '邮编',
  }
}

export function queryUserAddressList(user_id: number) {
  return axios.get<UserAddressItem[]>(`/v1/users/users/${user_id}/addresses`);
}

export function createUserAddressItem(user_id: number, data: UserAddressItem) {
  return axios.post(`/v1/users/users/${user_id}/addresses`, data);
}

export function updateUserAddressItem(user_id: number, id: number, data: UserAddressItem) {
  return axios.put(`/v1/users/users/${user_id}/addresses/${id}`, data);
}

export function getUserAddressItem(user_id: number, id: number) {
  return axios.get(`/v1/users/users/${user_id}/addresses/${id}`);
}

export function deleteUserAddressItem(user_id: number, id: number) {
  return axios.delete(`/v1/users/users/${user_id}/addresses/${id}`);
}