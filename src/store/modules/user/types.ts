export type RoleType = '' | '*' | 'admin' | 'user';
export interface UserProfile {
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
}
