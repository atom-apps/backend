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
      claims: undefined,
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
      const { data } = await getUserInfo();
      this.setInfo({ profile: data });

      const adminRoles = ['super_admin','system_admin','tenant_admin']
      if (adminRoles.includes(data.claims?.role ?? '')) {
        // get tenants
        const { data: tenants } = await queryTenantList({});
        let items: LabelItem[] = []
        tenants.items.forEach((item: TenantItem) => {
          items.push({ label: item.name ?? '', value: `${item.id}` })
        })
        this.setInfo({ tenants: items });

        // roles
        const { data: roles } = await queryRoleList({});

        items = []
        roles.items.forEach((item: RoleItem) => {
          items.push({ label: item.name ?? '', value: `${item.id}` })
        })
        this.setInfo({ roles: items });
      }
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const { data } = await userLogin(loginForm);
        setToken(data.token);
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
