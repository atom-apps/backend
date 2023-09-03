import { LabelItem } from "@/types/global";

export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserProfile {
  id?: number;
  uuid?: string;
  username?: string;
  email?: string;
  phone?: string;
  display_name?: string;
  avatar?: string
  role?: string;
}

export interface UserState {
  profile: UserProfile;
  tenants?: LabelItem[];
  roles?: LabelItem[];
}