import { Columns, Filter, FilterType, Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';

export enum ArticleType {
  Text = 0,
  Image = 1,
  Audio = 2,
  Video = 3,
}

export enum ArticleFormat {
  Html = 0,
  Markdown = 1,
}

export enum ArticlePriceType {
  Content = 0,
  Attachment = 1,
}

export const ArticleTypes = [
  { label: "图文", value: ArticleType.Text },
  { label: "图片", value: ArticleType.Image },
  { label: "视频", value: ArticleType.Video },
  { label: "音频", value: ArticleType.Audio },
]

export const ArticleFormats = [
  { label: "Markdown", value: ArticleFormat.Markdown },
  { label: "Html", value: ArticleFormat.Html },
]

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
  publish_at?: Date; // 发布时间
  type?: number; // 文章类型
  type_cn?: string; // 文章类型
  format?: number; // 文章格式
  format_cn?: string; // 文章格式
  title?: string; // 标题
  keyword?: string; // 关键词
  description?: string; // 简介
  post_ip?: string; // 发布IP
  weight?: number; // 权重

  thumbnails?: ArticleThumbnail[]; // 缩略图
  videos?: ArticleVideo[]; // 视频
  audios?: ArticleAudio[]; // 音频

  dig?: ArticleDigItem;
  content?: ArticleContentItem;
  forward_source?: ArticleForwardSource;
  payments?: ArticlePaymentItem[];
  tags?: string[];
}

export interface ArticleForm {
  book_id: number; // 书ID
  chapter_id: number; // 章节ID
  category_id: number; // 分类
  publish_at: Date; // 发布时间
  type: number; // 文章类型
  format: number; // 文章格式
  title: string; // 标题
  keyword: string; // 关键词
  keywords: string[]; // 关键词
  description: string; // 简介
  weight: number; // 权重

  thumbnails: ArticleThumbnail[]; // 缩略图
  videos: ArticleVideo[]; // 视频
  audios: ArticleAudio[]; // 音频

  dig: ArticleDigItem;
  content: ArticleContentItem;
  forward_source: ArticleForwardSource;
  payments: ArticlePaymentItem[];
  tags: string[];
}

export interface ArticleDigItem {
  views: number;
  likes: number;
  dislikes: number;
}

export interface ArticleVideo {
  provider: string;
  url: string;
}

export interface ArticleAudio {
  provider: string;
  url: string;
}

export interface ArticleThumbnail {
  width: number;
  height: number;
  image: string;
  head?: boolean;
}

export interface ArticleForwardSource {
  source: string;
  source_author: string;
}

interface ArticlePaymentItem {
  price_type: ArticlePriceType;  // Assuming you define ArticlePriceType in TypeScript
  token?: string;
  price?: number;               // Using number for uint64, but be aware of potential precision issues for very large numbers
  discount?: number;            // Similarly, using number for uint64
  discount_start_at?: Date;
  discount_end_at?: Date;
}


export interface ArticleContentItem {
  free_content: string;
  price_content?: string;
}

export const tableArticleFilters = (): Filter[] => {
  return [
    { type: FilterType.Date, name: 'updated_at', label: '更新时间' },
    { type: FilterType.Date, name: 'publish_at', label: '发布时间' },
    { type: FilterType.Number, name: 'category_id', label: '分类' },
    {
      type: FilterType.Number, name: 'type', label: '文章类型', items: [
        { label: '图文', value: '0' },
        { label: '图片', value: '1' },
        { label: '视频', value: '2' },
        { label: '音频', value: '3' },
      ]
    },
    {
      type: FilterType.Number, name: 'format', label: '文章格式', items: [
        { label: 'HTML', value: '0' },
        { label: 'Markdown', value: '1' },
      ]
    },
    { type: FilterType.String, name: 'title', label: '标题' },
  ]
}

export const tableArticleColumns = (): Columns => {
  return {
    columns: [
      { title: 'ID', dataIndex: 'id', slotName: 'id' },
      { title: '标题', dataIndex: 'title', slotName: 'title', fixed: "left" },
      { title: '创建时间', dataIndex: 'created_at', slotName: 'created_at', align: 'center' },
      { title: '更新时间', dataIndex: 'updated_at', slotName: 'updated_at' },
      { title: '关键词', dataIndex: 'keyword', slotName: 'keyword' },
      { title: '租户ID', dataIndex: 'tenant_id', slotName: 'tenant_id' },
      { title: '用户ID', dataIndex: 'user_id', slotName: 'user_id' },
      { title: '分类', dataIndex: 'category_id', slotName: 'category_id' },
      { title: '类型/格式', dataIndex: 'type_format', slotName: 'type_format', align: 'center' },
      { title: '浏览/喜欢/不喜欢', dataIndex: 'dig', slotName: 'dig', align: 'center' },
      { title: '标签', dataIndex: 'tags', slotName: 'tags', align: 'center' },
      { title: '付费', dataIndex: 'payments', slotName: 'payments', align: 'center' },
      { title: '转发', dataIndex: 'forward', slotName: 'forward', align: 'center' },

      { title: '发布IP', dataIndex: 'post_ip', slotName: 'post_ip' },
      { title: '权重', dataIndex: 'weight', slotName: 'weight' },
      { title: '操作', dataIndex: 'operations', slotName: 'operations', align: 'right', fixed: "right" },
    ],
    hidden: [
      'id', 'uuid', 'updated_at', 'deleted_at', 'post_ip', 'weight', 'tenant_id'
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
    'dig': '浏览/喜欢/点赞',
  }
}

export function queryArticleList(params: ArticleListQuery) {
  return axios.get<PaginationResp<ArticleItem>>('/v1/posts/articles', { params });
}

export function createArticleItem(data: ArticleForm) {
  return axios.post(`/v1/posts/articles`, data);
}

export function updateArticleItem(id: number, data: ArticleForm) {
  return axios.put(`/v1/posts/articles/${id}`, data);
}

export function getArticleItem(id: number) {
  return axios.get(`/v1/posts/articles/${id}`);
}

export function deleteArticleItem(id: number) {
  return axios.delete(`/v1/posts/articles/${id}`);
}