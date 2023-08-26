import { Pagination, PaginationResp } from '@/types/global';
import axios from 'axios';

export interface UserListQuery extends Pagination{
  createdAt?: Date;
  updatedAt?: Date;
  uuid?: string;
  username?: string;
  email?: string;
  emailVerified?: boolean;
  phone?: string;
  displayName?: string;
  status?: string; 
}

export interface UserItem {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  uuid?: string;
  username?: string;
  email?: string;
  emailVerified?: boolean;
  phone?: string;
  displayName?: string;
  avatar?: string;
  status?: string;
}



export function queryUserList(params: UserListQuery) {
  return axios.get<PaginationResp<UserItem>>('/v1/users', { params });
}
