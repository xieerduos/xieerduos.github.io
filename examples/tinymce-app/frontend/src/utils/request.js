/**
 * @file request
 * @author zhongyi.li
 */
import axios from 'axios';

const service = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // 默认的 send cookies when cross-domain requests
  timeout: 1000 * 60 // request timeout
});

// 请求拦截  设置统一header
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截  401 token过期处理
service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
