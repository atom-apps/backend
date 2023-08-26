export interface AnyObject {
  [key: string]: unknown;
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
  page: number;
  limit: number;
  total?: number;
}

export interface PaginationResp<T>{
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

