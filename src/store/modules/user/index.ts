import {
  LoginData,
  getUserInfo,
  login as userLogin,
  logout as userLogout
} from '@/api/user';
import { clearToken, setToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { defineStore } from 'pinia';
import useAppStore from '../app';
import { UserProfile } from './types';

const useUserStore = defineStore('user', {
  state: (): UserProfile => ({
    id: undefined,
    createdAt: undefined,
    updatedAt: undefined,
    uuid: undefined,
    username: undefined,
    email: undefined,
    emailVerified: undefined,
    phone: undefined,
    displayName: undefined,
    avatar: undefined
  }),

  getters: {
    userInfo(state: UserProfile): UserProfile {
      return { ...state };
    },
  },

  actions: {
    // Set user's information
    setInfo(partial: Partial<UserProfile>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();

      this.setInfo(res.data);
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
