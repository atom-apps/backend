import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface DriverListQuery extends Pagination {
  name?: string; // 名称
  endpoint?: string; // 地址
  access_key?: string; // AccessKey
  bucket?: string; // Bucket
}

export interface DriverItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  name?: string; // 名称
  endpoint?: string; // 地址
  access_key?: string; // AccessKey
  access_secret?: string; // AccessSecret
  bucket?: string; // Bucket
  options?: string; // 配置
}

export const tableDriverFilters = (): Filter[] => {
  return [
    { type: FilterType.String, name: 'driver_id', label: '类型' },
    { type: FilterType.String, name: 'name', label: '名称' },
    { type: FilterType.String, name: 'endpoint', label: '地址' },
    { type: FilterType.String, name: 'access_key', label: 'AccessKey' },
    { type: FilterType.String, name: 'bucket', label: 'Bucket' },
  ]
}

export const tableDriverColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '更新时间', dataIndex: 'updated_at', slotName: 'updated_at' },
      { title: '名称', dataIndex: 'name', slotName: 'name' },
      { title: '地址', dataIndex: 'endpoint', slotName: 'endpoint' },
      { title: 'AccessKey', dataIndex: 'access_key', slotName: 'access_key' },
      { title: 'AccessSecret', dataIndex: 'access_secret', slotName: 'access_secret' },
      { title: 'Bucket', dataIndex: 'bucket', slotName: 'bucket' },
      { title: '配置', dataIndex: 'options', slotName: 'options' }, 
      { title: '操作', dataIndex: 'operations' ,slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableDriverLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'deleted_at': '删除时间',
    'name': '名称',
    'endpoint': '地址',
    'access_key': 'AccessKey',
    'access_secret': 'AccessSecret',
    'bucket': 'Bucket',
    'options': '配置', 
  }
}

export function queryDriverList(params: DriverListQuery) {
  return axios.get<PaginationResp<DriverItem>>('/v1/storages/drivers', { params });
}

export function createDriverItem(data: DriverItem) {
  return axios.post(`/v1/storages/drivers`, data);
}

export function updateDriverItem(id: number, data: DriverItem) {
  return axios.put(`/v1/storages/drivers/${id}`, data);
}

export function getDriverItem(id: number) {
  return axios.get(`/v1/storages/drivers/${id}`);
}

export function deleteDriverItem(id: number) {
  return axios.delete(`/v1/storages/drivers/${id}`);
}