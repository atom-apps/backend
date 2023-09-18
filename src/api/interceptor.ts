import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { Message } from '@arco-design/web-vue';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (res: AxiosResponse) => {
    return res;
  },
  (error) => {
    console.log("ERROR", error)

    if (error.response) {
    console.log("ERROR", error.response)
      const resp = error.response.data
      switch (error.response.status) {
        case 401:
          Message.error({ content: '登录失效,请重新登录', });

          const f = async () => {
            const userStore = useUserStore();
            if (getToken()) {
              await userStore.logout();
            }
            window.location.reload();
          }
          f()
          break;
        default:
          if (!resp.message) {
            Message.error({ content: `${error.response.status} ${error.response.statusText} ${resp}`, duration: 5 * 1000, });
          } else {
            Message.error({ content: resp.message, duration: 5 * 1000, });
          }
      }

      return Promise.reject(new Error(resp.message || 'Error'));
    }


    let errMessage = 'Request Error'

    switch (error.response.status) {
      case 404:
        errMessage = 'Not Found'
        break;
    }
    Message.error({ content: errMessage, duration: 5 * 1000, });
    return Promise.reject(error);
  }
);
