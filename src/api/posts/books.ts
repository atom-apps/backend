import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface BookListQuery extends Pagination {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  deleted_at?: Date; // 删除时间
  tenant_id?: number; // 租户ID
  user_id?: number; // 用户ID
  title?: string; // 书名
  description?: string; // 简介
  content?: string; // 详细介绍
  author?: string; // 原作者
  source?: string; // 原书地址
  isbn?: string; // ISBN
  price?: number; // 价格
}

export interface BookItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  tenant_id?: number; // 租户ID
  user_id?: number; // 用户ID
  title?: string; // 书名
  description?: string; // 简介
  content?: string; // 详细介绍
  author?: string; // 原作者
  source?: string; // 原书地址
  isbn?: string; // ISBN
  price?: number; // 价格
}

export const tableBookFilters = (): Filter[] => {
  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.Number, name: 'tenant_id', label: '租户ID' },
    { type: FilterType.Number, name: 'user_id', label: '用户ID' },
    { type: FilterType.String, name: 'title', label: '书名' },
    { type: FilterType.String, name: 'isbn', label: 'ISBN' },
    { type: FilterType.Number, name: 'price', label: '价格' }, 
  ]
}

export const tableBookColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '更新时间', dataIndex: 'updated_at', slotName: 'updated_at' },
      { title: '删除时间', dataIndex: 'deleted_at', slotName: 'deleted_at' },
      { title: '租户ID', dataIndex: 'tenant_id', slotName: 'tenant_id' },
      { title: '用户ID', dataIndex: 'user_id', slotName: 'user_id' },
      { title: '封面', dataIndex: 'thumbnail', slotName: 'thumbnail' },
      { title: '书名', dataIndex: 'title', slotName: 'title' },
      { title: '原作者', dataIndex: 'author', slotName: 'author' },
      { title: '原书地址', dataIndex: 'source', slotName: 'source' },
      { title: 'ISBN', dataIndex: 'isbn', slotName: 'isbn' },
      { title: '价格', dataIndex: 'price', slotName: 'price' }, 
      { title: '操作', dataIndex: 'operations' ,slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableBookLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'deleted_at': '删除时间',
    'tenant_id': '租户ID',
    'user_id': '用户ID',
    'title': '书名',
    'description': '简介',
    'content': '详细介绍',
    'author': '原作者',
    'source': '原书地址',
    'isbn': 'ISBN',
    'price': '价格', 
  }
}

export function queryBookList(params: BookListQuery) {
  return axios.get<PaginationResp<BookItem>>('/v1/posts/books', { params });
}

export function createBookItem(data: BookItem) {
  return axios.post(`/v1/posts/books`, data);
}

export function updateBookItem(id: number, data: BookItem) {
  return axios.put(`/v1/posts/books/${id}`, data);
}

export function getBookItem(id: number) {
  return axios.get(`/v1/posts/books/${id}`);
}

export function deleteBookItem(id: number) {
  return axios.delete(`/v1/posts/books/${id}`);
}