import axios from "axios";
import type {
  InternalAxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
} from "axios";
import { message } from "antd";
import { baseUrl } from "@/utils/getEnv";

type ApiResponse<T> = {
  data: T;
  code: number;
  message: string;
};

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
  baseURL: baseUrl,
  withCredentials: true,
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
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse): Promise<any> {
    if (response.data.code !== 0) {
      message.error(response.data.message);
      return Promise.reject<ApiResponse<unknown>>(response.data);
    }
    return Promise.resolve(response.data.data);
  },
  function (error) {
    message.error(error.message);
    return Promise.reject(error);
  },
);

export default instance;
