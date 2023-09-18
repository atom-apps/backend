import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface ChapterListQuery extends Pagination {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  deleted_at?: Date; // 删除时间
  tenant_id?: number; // 租户ID
  user_id?: number; // 用户ID
  book_id?: number; // 书ID
  title?: string; // 章节名
  description?: string; // 简介
  content?: string; // 详细介绍
}

export interface ChapterItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  tenant_id?: number; // 租户ID
  user_id?: number; // 用户ID
  book_id?: number; // 书ID
  title?: string; // 章节名
  description?: string; // 简介
  content?: string; // 详细介绍
}

export const tableChapterFilters = (): Filter[] => {
  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.Date, name: 'created_at', label: '创建时间' },
    { type: FilterType.Date, name: 'updated_at', label: '更新时间' },
    { type: FilterType.Date, name: 'deleted_at', label: '删除时间' },
    { type: FilterType.Number, name: 'tenant_id', label: '租户ID' },
    { type: FilterType.Number, name: 'user_id', label: '用户ID' },
    { type: FilterType.Number, name: 'book_id', label: '书ID' },
    { type: FilterType.String, name: 'title', label: '章节名' },
    { type: FilterType.String, name: 'description', label: '简介' },
    { type: FilterType.String, name: 'content', label: '详细介绍' },
  ]
}

export const tableChapterColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '章节名', dataIndex: 'title', slotName: 'title' },
      { title: '简介', dataIndex: 'description', slotName: 'description' },
      { title: '详细介绍', dataIndex: 'content', slotName: 'content' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableChapterLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'deleted_at': '删除时间',
    'tenant_id': '租户ID',
    'user_id': '用户ID',
    'book_id': '书ID',
    'title': '章节名',
    'description': '简介',
    'content': '详细介绍',
  }
}

export function queryChapterList(book_id: number, params: ChapterListQuery) {
  return axios.get<PaginationResp<ChapterItem>>('/v1/posts/books/${book_id}/chapters', { params });
}

export function createChapterItem(book_id: number, data: ChapterItem) {
  return axios.post(`/v1/posts/books/${book_id}/chapters`, data);
}

export function updateChapterItem(book_id: number, id: number, data: ChapterItem) {
  return axios.put(`/v1/posts/books/${book_id}/chapters/${id}`, data);
}

export function getChapterItem(book_id: number, id: number) {
  return axios.get(`/v1/posts/books/${book_id}/chapters/${id}`);
}

export function deleteChapterItem(book_id: number, id: number) {
  return axios.delete(`/v1/posts/books/${book_id}/chapters/${id}`);
}