import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface LocationListQuery extends Pagination {
  code?: string; // 行政区划代码
  province?: string; // 省/直辖市
  city?: string; // 市
  area?: string; // 区县
  town?: string; // 乡镇
}

export interface LocationItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  code?: string; // 行政区划代码
  name?: string; // 名称
  province?: string; // 省/直辖市
  city?: string; // 市
  area?: string; // 区县
  town?: string; // 乡镇
}

export const tableLocationFilters = (): Filter[] => {
  return [
    { type: FilterType.String, name: 'code', label: '行政代码' },
    { type: FilterType.String, name: 'town', label: '乡镇' }, 
  ]
}

export const tableLocationColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '行政区划代码', dataIndex: 'code', slotName: 'code' },
      { title: '名称', dataIndex: 'name', slotName: 'name' },
      { title: '省/直辖市', dataIndex: 'province', slotName: 'province' },
      { title: '市', dataIndex: 'city', slotName: 'city' },
      { title: '区县', dataIndex: 'area', slotName: 'area' },
      { title: '乡镇', dataIndex: 'town', slotName: 'town' }, 
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableLocationLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'code': '行政区划代码',
    'name': '名称',
    'province': '省/直辖市',
    'city': '市',
    'area': '区县',
    'town': '乡镇', 
  }
}

export function queryLocationList(params: LocationListQuery) {
  return axios.get<PaginationResp<LocationItem>>('/v1/systems/locations', { params });
}

export function createLocationItem(data: LocationItem) {
  return axios.post(`/v1/systems/locations`, data);
}

export function updateLocationItem(id: number, data: LocationItem) {
  return axios.put(`/v1/systems/locations/${id}`, data);
}

export function getLocationItem(id: number) {
  return axios.get(`/v1/systems/locations/${id}`);
}

export function deleteLocationItem(id: number) {
  return axios.delete(`/v1/systems/locations/${id}`);
}