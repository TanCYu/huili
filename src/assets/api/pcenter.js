import request from '@/assets/js/ashx'
import tools from '@/assets/js/tools'
import base from '@/assets/api/base'


//获取用户权限下的功能页面
export function getUserPagesByToken() {
  let obj ={
    action:'getUserPagesByToken',
    appid:base.gAppid
  }
  return request({
    url: tools.createURL('/WebService/Weixin/MiniProgram/MiniProgram.ashx',obj), 
    method: 'post',
    data:tools.createParms()
  })
};
