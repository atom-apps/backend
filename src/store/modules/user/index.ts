import {
  LoginData,
  getUserInfo,
  login as userLogin,
  logout as userLogout
} from '@/api/user';
import { RoleItem, queryRoleList } from '@/api/users/roles';
import { TenantItem, queryTenantList } from '@/api/users/tenants';
import { LabelItem } from '@/types/global';
import { clearToken, setToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { defineStore } from 'pinia';
import useAppStore from '../app';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    profile: {
      id: undefined,
      uuid: undefined,
      username: undefined,
      email: undefined,
      phone: undefined,
      display_name: undefined,
      avatar: undefined,
      role: undefined,
    },
    roles: [],
    tenants: [],
  }),

  getters: {
    userState(state: UserState): UserState {
      return { ...state };
    },

  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async init() {
      const res = await getUserInfo();
      this.setInfo({ profile: res.data });

      // get tenants
      const tenantRes = await queryTenantList({});
      let items: LabelItem[] = []
      tenantRes.data.items.forEach((item: TenantItem) => {
        items.push({ label: item.name ?? '', value: `${item.id}` })
      })
      this.setInfo({ tenants: items });

      // roles
      const roleRes = await queryRoleList({});

      items = []
      roleRes.data.items.forEach((item: RoleItem) => {
        items.push({ label: item.name ?? '', value: `${item.id}` })
      })
      this.setInfo({ roles: items });
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
