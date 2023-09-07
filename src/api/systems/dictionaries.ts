import { Columns, Filter, FilterType, LabelItem, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface DictionaryListQuery extends Pagination {
  name?: string; // 名称
  slug?: string; // 别名
  description?: string; // 描述
}

export interface DictionaryItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  name?: string; // 名称
  slug?: string; // 别名
  description?: string; // 描述
  items?: LabelItem[]; // 选项
}

export const tableDictionaryFilters = (): Filter[] => {
  return [
    { type: FilterType.String, name: 'name', label: '名称' },
    { type: FilterType.String, name: 'slug', label: '别名' },
  ]
}

export const tableDictionaryColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '名称', dataIndex: 'name', slotName: 'name' },
      { title: '别名', dataIndex: 'slug', slotName: 'slug' },
      { title: '描述', dataIndex: 'description', slotName: 'description' },
      { title: '选项', dataIndex: 'items', slotName: 'items' }, 
      { title: '操作', dataIndex: 'operations' ,slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableDictionaryLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'deleted_at': '删除时间',
    'name': '名称',
    'slug': '别名',
    'description': '描述',
    'items': '选项', 
  }
}

export function queryDictionaryList(params: DictionaryListQuery) {
  return axios.get<PaginationResp<DictionaryItem>>('/v1/systems/dictionaries', { params });
}

export function createDictionaryItem(data: DictionaryItem) {
  return axios.post(`/v1/systems/dictionaries`, data);
}

export function updateDictionaryItem(id: number, data: DictionaryItem) {
  return axios.put(`/v1/systems/dictionaries/${id}`, data);
}

export function getDictionaryItem(id: number) {
  return axios.get(`/v1/systems/dictionaries/${id}`);
}

export function deleteDictionaryItem(id: number) {
  return axios.delete(`/v1/systems/dictionaries/${id}`);
}