import { Columns, Filter, FilterType, Pagination } from '@/types/global';
import { TreeNodeData } from '@arco-design/web-vue';
import axios from 'axios';


export interface MenuListQuery extends Pagination {
  name?: string; // 名称
  slug?: string; // 别名
}

export interface MenuItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  name?: string; // 名称
  slug?: string; // 别名
  group_id?: number; // 组
  parent_id?: number; // 父ID
  parent_key?: string; // 父ID
  metadata?: string; // 元数据
}

export const tableMenuFilters = (): Filter[] => {
  return [
    { type: FilterType.String, name: 'name', label: '名称' },
    { type: FilterType.String, name: 'slug', label: '别名' },
  ]
}

export const tableMenuColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '名称', dataIndex: 'name', slotName: 'name' },
      { title: '别名', dataIndex: 'slug', slotName: 'slug' },
      { title: '元数据', dataIndex: 'metadata', slotName: 'metadata' }, 
      { title: '操作', dataIndex: 'operations' ,slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableMenuLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'name': '名称',
    'slug': '别名',
    'group_id': '组',
    'parent_id': '父ID',
    'metadata': '元数据', 
  }
}

export function queryMenuList() {
  return axios.get<MenuItem[]>('/v1/systems/menus');
}

export function getMenuTree(group: number) {
  return axios.get<TreeNodeData[]>(`/v1/systems/menus/${group}/tree`, );
}

export function createMenuItem(data: MenuItem) {
  return axios.post(`/v1/systems/menus`, data);
}

export function createMenuSubItem(group: number, parent:number, name: string, slug: string) {
  return axios.post(`/v1/systems/menus/${group}/sub`, { parent_id: parent, name: name , slug: slug});
}

export function updateMenuItem(id: number, data: MenuItem) {
  return axios.put(`/v1/systems/menus/${id}`, data);
}

export function getMenuItem(id: number) {
  return axios.get<MenuItem>(`/v1/systems/menus/${id}`);
}

export function deleteMenuItem(id: number) {
  return axios.delete(`/v1/systems/menus/${id}`);
}