import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';


export interface ArticleListQuery extends Pagination {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  deleted_at?: Date; // 删除时间
  tenant_id?: number; // 租户ID
  user_id?: number; // 用户ID
  uuid?: string; // UUID
  book_id?: number; // 书ID
  chapter_id?: number; // 章节ID
  category_id?: number; // 分类
  publish_at?: string; // 发布时间
  type?: number; // 文章类型
  format?: number; // 文章格式
  title?: string; // 标题
  keyword?: string; // 关键词
  description?: string; // 简介
  thumbnails?: string; // 缩略图
  videos?: string; // 视频
  audios?: string; // 音频
  post_ip?: string; // 发布IP
  weight?: number; // 权重
}

export interface ArticleItem {
  id?: number; // ID
  created_at?: Date; // 创建时间
  updated_at?: Date; // 更新时间
  tenant_id?: number; // 租户ID
  user_id?: number; // 用户ID
  uuid?: string; // UUID
  book_id?: number; // 书ID
  chapter_id?: number; // 章节ID
  category_id?: number; // 分类
  publish_at?: string; // 发布时间
  type?: number; // 文章类型
  format?: number; // 文章格式
  title?: string; // 标题
  keyword?: string; // 关键词
  description?: string; // 简介
  thumbnails?: string; // 缩略图
  videos?: string; // 视频
  audios?: string; // 音频
  post_ip?: string; // 发布IP
  weight?: number; // 权重
}

export const tableArticleFilters = (): Filter[] => {
  return [
    { type: FilterType.List, name: "ids", label: "ID" },
    { type: FilterType.Date, name: 'created_at', label: '创建时间' },
    { type: FilterType.Date, name: 'updated_at', label: '更新时间' },
    { type: FilterType.Date, name: 'deleted_at', label: '删除时间' },
    { type: FilterType.Number, name: 'tenant_id', label: '租户ID' },
    { type: FilterType.Number, name: 'user_id', label: '用户ID' },
    { type: FilterType.String, name: 'uuid', label: 'UUID' },
    { type: FilterType.Number, name: 'book_id', label: '书ID' },
    { type: FilterType.Number, name: 'chapter_id', label: '章节ID' },
    { type: FilterType.Number, name: 'category_id', label: '分类' },
    { type: FilterType.String, name: 'publish_at', label: '发布时间' },
    { type: FilterType.Number, name: 'type', label: '文章类型' },
    { type: FilterType.Number, name: 'format', label: '文章格式' },
    { type: FilterType.String, name: 'title', label: '标题' },
    { type: FilterType.String, name: 'keyword', label: '关键词' },
    { type: FilterType.String, name: 'description', label: '简介' },
    { type: FilterType.String, name: 'thumbnails', label: '缩略图' },
    { type: FilterType.String, name: 'videos', label: '视频' },
    { type: FilterType.String, name: 'audios', label: '音频' },
    { type: FilterType.String, name: 'post_ip', label: '发布IP' },
    { type: FilterType.Number, name: 'weight', label: '权重' }, 
  ]
}

export const tableArticleColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at' },
      { title: '更新时间', dataIndex: 'updated_at', slotName: 'updated_at' },
      { title: '删除时间', dataIndex: 'deleted_at', slotName: 'deleted_at' },
      { title: '租户ID', dataIndex: 'tenant_id', slotName: 'tenant_id' },
      { title: '用户ID', dataIndex: 'user_id', slotName: 'user_id' },
      { title: 'UUID', dataIndex: 'uuid', slotName: 'uuid' },
      { title: '书ID', dataIndex: 'book_id', slotName: 'book_id' },
      { title: '章节ID', dataIndex: 'chapter_id', slotName: 'chapter_id' },
      { title: '分类', dataIndex: 'category_id', slotName: 'category_id' },
      { title: '发布时间', dataIndex: 'publish_at', slotName: 'publish_at' },
      { title: '文章类型', dataIndex: 'type', slotName: 'type' },
      { title: '文章格式', dataIndex: 'format', slotName: 'format' },
      { title: '标题', dataIndex: 'title', slotName: 'title' },
      { title: '关键词', dataIndex: 'keyword', slotName: 'keyword' },
      { title: '简介', dataIndex: 'description', slotName: 'description' },
      { title: '缩略图', dataIndex: 'thumbnails', slotName: 'thumbnails' },
      { title: '视频', dataIndex: 'videos', slotName: 'videos' },
      { title: '音频', dataIndex: 'audios', slotName: 'audios' },
      { title: '发布IP', dataIndex: 'post_ip', slotName: 'post_ip' },
      { title: '权重', dataIndex: 'weight', slotName: 'weight' }, 
      { title: '操作', dataIndex: 'operations' ,slotName: 'operations', align: 'right' },
    ],
    hidden: [
      'uuid', 'created_at', 'updated_at', 'deleted_at'
    ],
  }
}

export const tableArticleLabels = (): Record<string, string> => {
  return {
    'id': 'ID',
    'created_at': '创建时间',
    'updated_at': '更新时间',
    'deleted_at': '删除时间',
    'tenant_id': '租户ID',
    'user_id': '用户ID',
    'uuid': 'UUID',
    'book_id': '书ID',
    'chapter_id': '章节ID',
    'category_id': '分类',
    'publish_at': '发布时间',
    'type': '文章类型',
    'format': '文章格式',
    'title': '标题',
    'keyword': '关键词',
    'description': '简介',
    'thumbnails': '缩略图',
    'videos': '视频',
    'audios': '音频',
    'post_ip': '发布IP',
    'weight': '权重', 
  }
}

export function queryArticleList(params: ArticleListQuery) {
  return axios.get<PaginationResp<ArticleItem>>('/v1/posts/articles', { params });
}

export function createArticleItem(data: ArticleItem) {
  return axios.post(`/v1/posts/articles`, data);
}

export function updateArticleItem(id: number, data: ArticleItem) {
  return axios.put(`/v1/posts/articles/${id}`, data);
}

export function getArticleItem(id: number) {
  return axios.get(`/v1/posts/articles/${id}`);
}

export function deleteArticleItem(id: number) {
  return axios.delete(`/v1/posts/articles/${id}`);
}