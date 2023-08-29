export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserProfile {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  uuid?: string;
  username?: string;
  email?: string;
  email_verified?: boolean;
  phone?: string;
  display_name?: string;
  avatar?: string;
  status?: string;
}
