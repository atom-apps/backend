import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface FilesystemListQuery extends Pagination {
  filename?: string; // 文件名
  parent_id?: number; // 父级ID
  mime?: string; // MIME
  ext?: string; // 后缀名
}

export interface FilesystemItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  tenant_id?: number; // 租户ID
  user_id?: number; // 用户ID
  driver_id?: number; // 驱动
  filename?: string; // 文件名
  type?: string; // 类型
  parent_id?: number; // 父级ID
  status?: string; // 状态
  mime?: string; // MIME
  ext?: string; // 后缀名
  size?: number; // 后缀名
  md5?: string; // 后缀名
  share_uuid?: string; // 共享ID
  metadata?: string; // 元数据
  children?: FilesystemItem[]; // 元数据
}

export const tableFilesystemFilters = (): Filter[] => {
  return [
    { type: FilterType.Number, name: 'tenant_id', label: '租户ID' },
    { type: FilterType.Number, name: 'user_id', label: '用户ID' },
    { type: FilterType.Number, name: 'driver_id', label: '驱动' },
    { type: FilterType.String, name: 'filename', label: '文件名' },
    { type: FilterType.String, name: 'type', label: '类型' },
    { type: FilterType.Number, name: 'parent_id', label: '父级ID' },
    { type: FilterType.String, name: 'mime', label: 'MIME' },
    { type: FilterType.String, name: 'ext', label: '后缀名' },
  ]
}

export const tableFilesystemColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '更新时间', dataIndex: 'updated_at', slotName: 'updated_at' },
      { title: '删除时间', dataIndex: 'deleted_at', slotName: 'deleted_at' },
      { title: '租户ID', dataIndex: 'tenant_id', slotName: 'tenant_id' },
      { title: '用户ID', dataIndex: 'user_id', slotName: 'user_id' },
      { title: '驱动', dataIndex: 'driver_id', slotName: 'driver_id' },
      { title: '文件名', dataIndex: 'filename', slotName: 'filename' },
      { title: '类型', dataIndex: 'type', slotName: 'type' },
      { title: '父级ID', dataIndex: 'parent_id', slotName: 'parent_id' },
      { title: '状态', dataIndex: 'status', slotName: 'status' },
      { title: 'MIME', dataIndex: 'mime', slotName: 'mime' },
      { title: '后缀名', dataIndex: 'ext', slotName: 'ext' },
      { title: '共享ID', dataIndex: 'share_uuid', slotName: 'share_uuid' },
      { title: '元数据', dataIndex: 'metadata', slotName: 'metadata' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableFilesystemLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'deleted_at': '删除时间',
    'tenant_id': '租户ID',
    'user_id': '用户ID',
    'driver_id': '驱动',
    'filename': '文件名',
    'type': '类型',
    'parent_id': '父级ID',
    'status': '状态',
    'mime': 'MIME',
    'ext': '后缀名',
    'share_uuid': '共享ID',
    'metadata': '元数据',
  }
}

export function queryFilesystemList(params: FilesystemListQuery) {
  return axios.get<PaginationResp<FilesystemItem>>('/v1/storages/filesystems', { params });
}

export function createFilesystemItem(data: FilesystemItem) {
  return axios.post(`/v1/storages/filesystems`, data);
}

export function updateFilesystemItem(id: number, data: FilesystemItem) {
  return axios.put(`/v1/storages/filesystems/${id}`, data);
}

export function getFilesystemItem(id: number) {
  return axios.get(`/v1/storages/filesystems/${id}`);
}

export function deleteFilesystemItem(id: number) {
  return axios.delete(`/v1/storages/filesystems/${id}`);
}

export function getFilesystemDirectoryTree() {
  return axios.get<FilesystemItem[]>(`/v1/storages/filesystems/directories/tree`);
}