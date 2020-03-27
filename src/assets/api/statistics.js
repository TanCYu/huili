import ashx from '@/assets/js/ashx'
import request from '@/assets/js/request'
import tools from '@/assets/js/tools'


//获取用户权限下可查看的分店
export function getPermitOrgOID() {
  let obj = {
    action: 'GetUserPermitOrgList',
  }
  return ashx({
    url: tools.createURL('/WebService/WxStatistics/BossReport.ashx', obj),
    method: 'post',
    data: tools.createParms()
  })
};
//获取门店统计 — 所有门店 统计
export function getStatisticsSumAll(obj) {
  return ashx({
    url: tools.createURL('/WebService/WxStatistics/BossReport.ashx', obj),
    method: 'post',
    data: tools.createParms()
  })
};
//用户消费订单金额分布接口
export function queryOrderData(obj){
  return ashx({
    url: tools.createURL('/WebService2/Report/Report.ashx', obj),
    method: 'post',
    data: tools.createParms()
  })
}

//汇总统计下 各分店排行
export function getLineReport(p) {
  return request({
    url: '/zapi/hpc/hpc/orderB2COffLine/v1/GetOrderOrderB2COffLineReport',
    method: 'post',
    data: p
  })
};

// 我的品牌列表
export function investBrand(){
  return ashx({
    url: '/WebService2/Brand/Brand.ashx?action=BrandListByInvestment',
    method: 'post',
    data: tools.createParms()
  })
}

//计算器计算
export function investCount(obj){
  return ashx({
    url: '/WebService2/Investment/Investment.ashx?action=CapitalCalculation',
    method: 'post',
    data: tools.createParms(obj)
  })
}
