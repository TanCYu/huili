<template>
  <div class="ticket column" style="background-color: #eaeaea;">
    <div class style="flex:1">
      <div class="scan pcenter">
        <div
          class="pcenter"
          style="width:100px;height:100px;border-radius:50%;background-color:#FFE002;box-shadow:3px 3px 3px #BCBCBC;"
        >
          <div @click="tapScan" class="iconfont icon-saoma2" style="font-size:70px;"></div>
        </div>
      </div>
      <div class="section row" @click="show1 = true">
        <span class="text-orange"></span>
        <span class>门店选择</span>
        <span class style="flex:1"></span>
        <span class>{{curIndx >=0 ?orgList[curIndx].OrgName : ''}}</span>
        <img
          v-show="curIndx >=0"
          src="@/assets/imgs/right.png"
          style="margin-left:5px;width:14px;height:14px"
          alt
          class
        />
      </div>
      <div class="section row">
        <span class="text-orange"></span>
        <span class>卡券选择</span>
      </div>
      <div class="section row">
        <span class="text-orange"></span>
        <span class>商品列表</span>
      </div>
    </div>
    <div class="pcenter foot" style="height:60px">
      <Button :loading="isload" type="info" loading-text="核销中..." style="font-size:16px">确定</Button>
    </div>
    <!-- picker -->
    <Popup class v-model="show1" position="bottom" :style="{ height: '40%' }">
      <picker
        show-toolbar
        value-key="OrgName"
        :columns="orgList"
        @cancel="show1= false"
        @confirm="onConfirm"
      />
    </Popup>
  </div>
</template>

<script>
import base from "@/assets/api/base";
import { Button, Popup, picker } from "vant";
import { getOrgList, getCouponsList } from "@/assets/api/ticket";
export default {
  name: "ticket",
  components: { Button, Popup, picker },
  data() {
    return {
      userID: 0, //扫吗Id
      orgList: [],
      curIndx: -1,
      show1: false,
      ticketList: [],
      isload: false
    };
  },
  beforeRouteUpdate(to, from, next) {
    if (to.query.scanResult) {
      let scanResult = to.query.scanResult
      this.userID = scanResult
    }
    next()
  },
  created() {
    this.getOrgList();
  },
  methods: {
    onConfirm(value, index) {
      this.show1 = false;
      this.curIndx = index;
    },
    getOrgList() {//仓列表
      getOrgList({ OrgCenterOID: base.OrgCenterOID }).then(data => {
        this.orgList = data;
        this.curIndx = this.orgList.length > 0 ? 0 : -1;
      });
    },
    getCouponsList() {//卡券列表
      getCouponsList({
        memberId: this.userID,
        orgId: this.orgList[this.curIndx].OID
      }).then(data => {
        this.ticketList = data;
      });
    },
    tapScan() {//扫码
      window.wx.miniProgram.navigateTo({
        url: '/pages/scan/scan',
      })
    }
  }
};
</script>
<style scoped lang="less">
.ticket {
  height: 100%;
  .scan {
    height: 150px;
  }
  .section {
    height: 50px;
    align-items: center;
    background-color: white;
    font-size: 16px;
    color: #000;
    padding-left: 16px;
    padding-right: 10px;
    border-bottom: 1px solid #eaeaea;
    .text-orange {
      display: block;
      width: 4px;
      height: 16px;
      border-radius: 2px;
      background-color: tomato;
      margin-right: 6px;
    }
  }

  button {
    width: 90%;
    height: 42px;
    line-height: 42px;
    border-radius: 5px;
  }
}
</style>
