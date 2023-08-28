import { TableColumnData } from "@arco-design/web-vue";

export interface AnyObject {
  [key: string]: any;
}

export interface Options {
  value: unknown;
  label: string;
}

export interface NodeOptions extends Options {
  children?: NodeOptions[];
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pagination {
  current?: number;
  pageSize?: number;
}

export interface PaginationResp<T> {
  page: number;
  limit: number;
  total?: number;
  items: T[];
}

export interface Sorter {
  asc?: string;
  desc?: string
}


export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}

export interface LabelItem {
  label: string;
  value: string;
}

export enum FilterType {
  String = 'string',
  Number = 'number',
  List = 'list',
  Date = 'date',
  Bool = 'bool'
}

export interface Filter {
  type: FilterType;
  label: string;
  name: string;
  value?: string; // 使用 ? 表示此属性是可选的
  items?: LabelItem[]; // 同样是可选的
}

export const BoolOptions = [{ label: '是', value: 'true' }, { label: '否', value: 'false' }]

export interface Columns {
  columns: TableColumnData[];
  hidden?: string[];
}