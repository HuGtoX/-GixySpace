import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
} from "axios";
import { message } from "antd";
import { GuestID } from "../../config/Const";

declare module "axios" {
  interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}

const instance: AxiosInstance = axios.create({
  withCredentials: false,
  timeout: 1000 * 60,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    config.data = config.data;
    // @ts-ignore
    config.headers = {
      "Content-Type": "application/json", //配置请求头
    };

    // 添加访客ID
    if (typeof window !== "undefined") {
      const guestId = localStorage.getItem(GuestID) || "default-guest-id";
      config.headers["X-Guest-ID"] = guestId;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse): Promise<any> {
    return Promise.resolve(response.data);
  },
  function (error) {
    message.error(error.message);
    return Promise.reject(error);
  },
);

export default instance;
