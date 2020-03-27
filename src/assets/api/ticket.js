import ashx from '@/assets/js/ashx'
import request from '@/assets/js/request'
import tools from '@/assets/js/tools'


//卡券核销 门店列表
export function getOrgList(p) {
    let obj = {
        action: 'getOrgListByOrgCenter',
    }
    return ashx({
        url: tools.createURL('/WebService2/Organization/Organization_Manager.ashx', obj),
        method: 'post',
        data: tools.createParms(p)
    })
};
// 卡券核销 卡券列表z
export function getCouponsList(p) {
    return request({
        url: '/CouponManager/v2/user/gift',
        method: 'post',
        data: p
    })
};

