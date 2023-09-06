import { UserProfile } from '@/store/modules/user/types';
import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';


export enum SigninMethod {
  Code = "code",
  Password = "password",
}
export interface LoginData {
  method: SigninMethod,
  username: string,
  password?: string,
  token?: boolean,
}

export interface TokenData {
  token: string; 
}
export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return axios.post<LoginRes>('/v1/auth/signin', data);
}

export function logout() {
  return axios.post<LoginRes>('/v1/auth/logout');
}

export function getUserInfo() {
  return axios.get<UserProfile>('/v1/users/users/profile');
}

export function getMenuList() {
  return axios.get<RouteRecordNormalized[]>('/v1/auth/pages');
}
