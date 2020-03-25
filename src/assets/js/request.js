import axios from 'axios'
import qs from 'qs'
import base from '@/assets/api/base'

import { Toast } from 'vant';

const service = axios.create({
  baseURL: base.apiHost, // api 域名
  timeout: 8000 // request timeout
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer #R0RV5TD4JF7M";
    config.headers["Content-Type"]= 'application/json';
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// 请求
service.interceptors.response.use(
  response => response.data,
  error => {
    Toast.fail(error.message);
    return Promise.reject(error)
  }
)
export default service
