import axios from 'axios'
import qs from 'qs'
import base from '@/assets/api/base'

import { Toast } from 'vant';

const service = axios.create({
  baseURL: base.gYunlvServer, // api 域名
  timeout: 8000 // request timeout
})
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    // config.headers["Content-Type"]= 'application/x-www-form-urlencoded';
    // config.headers["Access-Control-Allow-Origin"] = "*";
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)
// 请求
service.interceptors.response.use(
  response => {
    if(response.data.State=='error'){
      Toast.fail(response.data.Message)
      return Promise.reject(response.data.State)
    }else{
      return Promise.resolve(JSON.parse(response.data.Message))
    }
  },
  error => {
    Toast.fail(error.message);
    return Promise.reject(error)
  }
)
export default service
