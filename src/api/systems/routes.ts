import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export enum RouteType {
  Page = 'page',
  Api = 'api',
}

export interface RouteListQuery extends Pagination {
  id?: number; // 
  type?: string; // 类型
  parent_id?: number; // 父级ID
  name?: string; // 名称
  path?: string; // 路径
  metadata?: string; // 元数据
  order?: number; // 排序
}

export interface RouteItem {
  id?: number; // 
  type?: string; // 类型
  parent_id?: number; // 父级ID
  name?: string; // 名称
  path?: string; // 路径
  metadata?: string; // 元数据
  order?: number; // 排序
}

export const tableRouteFilters = (): Filter[] => {
  return [
    {
      type: FilterType.String, name: 'type', label: '类型', items: [
        { label: '页面', value: RouteType.Page },
        { label: '接口', value: RouteType.Api },
      ]
    },
    { type: FilterType.String, name: 'name', label: '名称' },
    { type: FilterType.String, name: 'path', label: '路径' },
  ]
}

export const tableRouteColumns = (): Columns => {
  return {
    columns: [
      { title: '', dataIndex: 'id', slotName: 'id' },
      { title: '类型', dataIndex: 'type', slotName: 'type' },
      { title: '名称', dataIndex: 'name', slotName: 'name' },
      { title: '路径', dataIndex: 'path', slotName: 'path' },
      { title: '元数据', dataIndex: 'metadata', slotName: 'metadata' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at', "metadata"
    ],
  }
}

export const tableRouteLabels = (): Record<string, string> => {
  return {
    'id': '',
    'type': '类型',
    'parent_id': '父级ID',
    'name': '名称',
    'path': '路径',
    'metadata': '元数据',
    'order': '排序',
  }
}

export function queryRouteList(params: RouteListQuery) {
  return axios.get<PaginationResp<RouteItem>>('/v1/systems/routes', { params });
}

export function createRouteItem(data: RouteItem) {
  return axios.post(`/v1/systems/routes`, data);
}

export function updateRouteItem(id: number, data: RouteItem) {
  return axios.put(`/v1/systems/routes/${id}`, data);
}

export function getRouteItem(id: number) {
  return axios.get(`/v1/systems/routes/${id}`);
}

export function deleteRouteItem(id: number) {
  return axios.delete(`/v1/systems/routes/${id}`);
}