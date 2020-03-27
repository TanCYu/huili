<template>
  <div class="orgStatisticsNew column">
    <div class="top row">
      <div class="btn column" @click="show1=true">
        <span class>{{curOrgName}}</span>
        <span class>当前分店</span>
      </div>
      <div class="btn column" @click="show2=true">
        <span class>{{dateStart.slice(0,10)}}</span>
        <span class>{{dateStart.slice(11,16)}}</span>
      </div>
      <div class="btn column" @click="show3=true">
        <span class>{{dateEnd.slice(0,10)}}</span>
        <span class>{{dateEnd.slice(11,16)}}</span>
      </div>
    </div>
    <div class="query row pcenter">
      <Button
        :disabled="isload"
        class="btn"
        color="#ffe002"
        @click="query"
        :loading="isload"
        type="info"
        loading-text="加载中..."
      >查 询</Button>
    </div>
    <!-- section -->
    <div class="section-wrap" style>
      <!-- 当月目标 -->
      <div class="section" style="margin-bottom:10px">
        <div class="title">当月目标</div>
        <div class="row part1 height">
          <div class="column" style="flex:1">
            <span class>{{initJson.TargetAmount?initJson.TargetAmount:0}}</span>
            <span class>当月目标（万）</span>
          </div>
          <div class="column" style="flex:1">
            <span class>{{initJson.AlreadyAmount?initJson.AlreadyAmount:0}}</span>
            <span class>当月汇总（万）</span>
          </div>
        </div>
        <div class="prog">
          <Progress
            :percentage="initJson.TargetPercent*100?initJson.TargetPercent:0"
            stroke-width="8"
          />
        </div>
      </div>
      <!-- 当日目标 -->
      <div class="section" style="margin-bottom:10px">
        <div class="title">当日目标</div>
        <div class="row part1 height">
          <div class="column" style="flex:1">
            <span class>{{initJson.TargetAmountPerDay?initJson.TargetAmountPerDay:0}}</span>
            <span class>当日目标（万）</span>
          </div>
          <div class="column" style="flex:1">
            <span class>{{initJson.AlreadyAmountPerDay?initJson.AlreadyAmountPerDay:0}}</span>
            <span class>当日汇总（万）</span>
          </div>
        </div>
        <div class="prog">
          <Progress
            :percentage="initJson.TargetPercentPerDay*100?initJson.TargetPercentPerDay:0"
            stroke-width="8"
          />
        </div>
      </div>
      <!-- 访问统计 -->
      <div class="section" style="margin-bottom:10px">
        <div class="title">访问统计</div>
        <div class="part1 row height">
          <div class="column" style="flex:1">
            <span class>{{initJson.UserVisiteOfflineCount?initJson.UserVisiteOfflineCount:0}}</span>
            <span class>共计访问次数</span>
          </div>
          <div class="column" style="flex:1">
            <span class>{{initJson.UserRealCount?initJson.UserRealCount:0}}</span>
            <span class>实际访问人数</span>
          </div>
          <div class="column" style="flex:1">
            <span class>{{initJson.UserNewCount?initJson.UserNewCount:0}}</span>
            <span class>首次到店人数</span>
          </div>
        </div>
        <div class style="height:10px"></div>
        <div class="count row" v-if="lineshow">
          <div class="count-son column" v-for="(item,index) in initJson.DeviceList" :key="index">
            <div class="sum">{{item.VisitCount?item.VisitCount:0}}</div>
            <div class="row count-name pcenter" style="padding-left:12px">
              <div
                class="iconfont icon-zhaji"
                style="width:20px;font-size:18px;margin-right:4px"
                :style="{color:(item.DeviceState?'green':'red')}"
              ></div>
              <div class style="flex:1">{{item.DeviceName}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 销售统计 -->
      <div class="section" style="margin-bottom:10px">
        <div class="title">销售统计</div>
        <div class="row" style="flex-wrap:wrap">
          <div class="column pcenter height" style="width:50%">
            <span class="smar">{{initJson.OrderOfflinePriceSale?initJson.OrderOfflinePriceSale:0}}</span>
            <span class>销售额-元</span>
          </div>
          <div class="column pcenter height" style="width:50%;">
            <span class="smar">{{initJson.OrderSkuCount?initJson.OrderSkuCount:0}}</span>
            <span class>商品数-件</span>
          </div>
          <div class="column pcenter height" style="width:50%;">
            <span class="smar">{{initJson.OrderOfflineCount?initJson.OrderOfflineCount:0}}</span>
            <span class>订单数-个</span>
          </div>
          <div class="column pcenter height" style="width:50%;">
            <span class="smar">{{initJson.PurchaseRate?initJson.PurchaseRate:0}}%</span>
            <span class>购买率</span>
          </div>
          <div class="column pcenter height" style="width:50%;">
            <span class="smar">{{initJson.OrderAvgPrice?initJson.OrderAvgPrice:0}}</span>
            <span class>客单价-元/个</span>
          </div>
          <div class="column pcenter height" style="width:50%;">
            <span class="smar">{{initJson.OrderAvgCount?initJson.OrderAvgCount:0}}</span>
            <span class>客单数-件/个</span>
          </div>
        </div>
        <div class style="height:10px"></div>
      </div>
    </div>
    <saleRank style="margin-bottom:10px" v-show="!lineshow" :data="saleRankData"></saleRank>
    <peopleflowRank style="margin-bottom:10px" v-show="!lineshow" :data="peopleFlowData"></peopleflowRank>
    <unitpriceCount style="margin-bottom:10px" v-show="!lineshow" :data="preCustomData"></unitpriceCount>
    <brandCount style="margin-bottom:10px" :data="brandData"></brandCount>
    <cateCount style="margin-bottom:10px" :data="classifyData"></cateCount>
    <orderCount style="margin-bottom:10px" :data="orderData"></orderCount>
    <rebuyCount style="margin-bottom:10px" :data="rebuyData"></rebuyCount>
    <!-- ======picker======== -->
    <Popup class v-model="show1" position="bottom" :style="{ height: '40%' }">
      <picker
        show-toolbar
        value-key="OrgName"
        :columns="orgList"
        @cancel="show1= false"
        @confirm="onConfirm"
      />
    </Popup>
    <Popup class v-model="show2" position="bottom" :style="{ height: '40%' }">
      <datetime-picker
        v-model="currentDate1"
        type="datetime"
        @cancel="show2= false"
        @confirm="onConfirm2"
        :formatter="formatter"
        :min-date="minDate"
        :max-date="currentDate2"
      />
    </Popup>
    <Popup class v-model="show3" position="bottom" :style="{ height: '40%' }">
      <datetime-picker
        v-model="currentDate2"
        type="datetime"
        @cancel="show3= false"
        @confirm="onConfirm3"
        :formatter="formatter"
        :max-date="maxDate"
      />
    </Popup>
  </div>
</template>
<script>
import saleRank from "./saleRank";
import peopleflowRank from "./peopleflowRank";
import brandCount from "./brandCount";
import orderCount from "./orderCount";
import cateCount from "./cateCount";
import rebuyCount from "./rebuyCount";
import unitpriceCount from "./unitpriceCount";
import loadd from "./loadd";
import base from "@/assets/api/base";
import { Toast, Button } from "vant";
import common from "@/assets/js/common";
import tools from "@/assets/js/tools";
import {
  getPermitOrgOID,
  getLineReport,
  getStatisticsSumAll,
  queryOrderData
} from "@/assets/api/statistics";
import { Popup, picker, DatetimePicker, Progress } from "vant";
export default {
  name: "orgStatisticsNew",
  components: {
    Button,
    peopleflowRank,
    saleRank,
    unitpriceCount,
    rebuyCount,
    orderCount,
    brandCount,
    cateCount,
    loadd,
    Popup,
    picker,
    DatetimePicker,
    Progress
  },
  data() {
    return {
      isload: true,
      show1: false,
      show2: false,
      show3: false,
      orgList: [], //店铺列表
      curOrgName: "分店汇总", //当前店铺名
      curOrgOID: 0, //当前店铺id
      oidStr: "",
      startYear: 2018,
      endYear: 2030,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2030, 0, 1),
      currentDate1: new Date(),
      currentDate2: new Date(),
      dateStart: "", //开始时间
      dateEnd: "", //结束时间
      initJson: {}, //所有店铺统计
      lineshow: false, //false 所有店铺 。 true 单个店铺 闸机列表是否
      brandData: {
        tableData: [],
        chartData: []
      },
      classifyData: {
        tableData: [],
        chartData: []
      },
      orderData: {
        tableData: [],
        chartData: []
      },
      rebuyData: {
        tableData: [],
        chartData: []
      },
      preCustomData: [], //客单价统计
      saleRankData: [],
      peopleFlowData: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //初始化 时间、店铺
      this.dateStart = tools.timer().dateS;
      this.dateEnd = tools.timer().dateE;
      this.currentDate1 = new Date(
        tools.timer().dateO.y,
        tools.timer().dateO.m,
        tools.timer().dateO.d
      );
      this.getPermitOrgOID();
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
    },
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      } else if (type === "second") {
        return `${value}秒`;
      }
      return value;
    },
    getPermitOrgOID() {
      //获取所有分店 - 查询所有门店统计
      getPermitOrgOID()
        .then(data => {
          if (data.length == 0) {
            Toast("没有可查看的分店");
            return false;
          }
          this.orgList = data;
          let arr = [];
          data.forEach(v => {
            arr.push(v.OrgOID);
          });
          this.oidStr = arr.join(",");
          this.orgList.unshift({ OrgOID: "0", OrgName: "分店汇总" });
          this.curOrgName = this.orgList[0].OrgName;
          this.curOrgOID = this.orgList[0].OrgOID;
        })
        .then(() => {
          this.getSumAll();
        });
    },
    //搜索==点击查询
    query() {
      let sa = this.dateStart.split(" ");
      let se = this.dateEnd.split(" ");
      let startTime = Number(
        sa[0].split("-")[0] +
          sa[0].split("-")[1] +
          sa[0].split("-")[2] +
          sa[1].split(":")[0] +
          sa[1].split(":")[1]
      );
      let endTime = Number(
        se[0].split("-")[0] +
          se[0].split("-")[1] +
          se[0].split("-")[2] +
          se[1].split(":")[0] +
          se[1].split(":")[1]
      );
      console.log(startTime);
      console.log(endTime);
      if (startTime > endTime) {
        Toast("开始时间不能大于结束时间");
        return false;
      }
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.isload = true;
      if (this.curOrgOID != 0) {
        this.getOrgOrder();
      } else {
        this.getSumAll();
      }
    },
    //======所有门店 统计 api====
    getSumAll() {
      let obj = {
        action: "mpGetOrgStatisticsSumAll",
        OrgOID: this.curOrgOID,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd
      };
      getStatisticsSumAll(obj)
        .then(data => {
          this.initJson = data;
          this.lineshow = false;
          this.handleBrandData(data);
          this.handCateData(data);
        })
        .then(() => {
          this.getLineReport();
        })
        .then(() => {
          this.getOrderData();
        })
        .then(() => {
          this.getRebuyData();
        })
        .catch(() => {
          this.isload = false;
        });
    },
    getLineReport() {
      let obj = {
        beginTime: this.dateStart,
        endTime: this.dateEnd,
        orgOID: this.oidStr,
        appid: base.gAppid
      };
      getLineReport(obj)
        .then(data => {
          console.log(data);
          if (data.data) {
            this.querySumStoreSucc(data);
          }
        })
        .catch(() => {
          this.isload = false;
        });
    },
    // ====单个仓 api====
    getOrgOrder() {
      //订单统计 单个仓统计
      let p = {
        action: "mpGetOrgStatisticsOrder",
        OrgOID: this.curOrgOID,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        appid: base.gAppid
      };
      getStatisticsSumAll(p)
        .then(data => {
          this.initJson.TargetAmount = data.TargetAmount;
          this.initJson.AlreadyAmount = data.AlreadyAmount;
          this.initJson.TargetPercent = data.TargetPercent;
          this.initJson.TargetAmountPerDay = data.TargetAmountPerDay;
          this.initJson.AlreadyAmountPerDay = data.AlreadyAmountPerDay;
          this.initJson.TargetPercentPerDay = data.TargetPercentPerDay;
          this.initJson.OrderOfflinePriceSale = data.OrderOfflinePriceSale;
          this.initJson.OrderSkuCount = data.OrderSkuCount;
          this.initJson.OrderOfflineCount = data.OrderOfflineCount;
          this.initJson.PurchaseRate = data.PurchaseRate;
          this.initJson.OrderAvgPrice = data.OrderAvgPrice;
          this.initJson.OrderAvgCount = data.OrderAvgCount;
          this.handleBrandData(data);
          this.handCateData(data);
        })
        .then(() => {
          this.getGateCount();
        })
        .then(() => {
          this.getCateAll();
        })
        .then(() => {
          this.getOrderData();
        })
        .then(() => {
          this.getRebuyData();
        })
        .catch(() => {
          this.isload = false;
        });
    },
    getGateCount() {
      //访问统计 闸机统计接口
      let obj = {
        action: "mpGetOrgStatisticsGate",
        OrgOID: this.curOrgOID,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        appid: base.gAppid
      };
      getStatisticsSumAll(obj)
        .then(data => {
          this.initJson.UserVisiteOfflineCount = data.UserVisiteOfflineCount;
          this.initJson.UserRealCount = data.UserRealCount;
          this.initJson.UserNewCount = data.UserNewCount;
          this.lineshow = true;
        })
        .catch(() => {
          this.isload = false;
        });
    },
    getCateAll() {
      //访问统计 闸机设备统计接口
      let p = {
        action: "mpGetOrgStatisticsEquipment",
        OrgOID: this.curOrgOID,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        appid: base.gAppid
      };
      getStatisticsSumAll(p)
        .then(data => {
          data.DeviceList.forEach(v => {
            let date1 = common.JSONDateToDateStr(v.TimeHeartLast);
            let date2 = common.JSONDateToDateStr(v.TimeNow);
            let second = common.getSecondByTowDate(date1, date2);
            if (second > 60) {
              v.DeviceState = false; //设备异常
            } else {
              v.DeviceState = true; //设备正常
            }
          });
          this.initJson.DeviceList = data.DeviceList;
        })
        .catch(() => {
          this.isload = false;
        });
    },
    // ====公用====
    getOrderData() {
      //用户消费订单金额分布接口
      let p = {
        action: "GetUserOrderF",
        OrgOID: this.curOrgOID,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        appid: base.gAppid
      };
      queryOrderData(p)
        .then(data => {
          this.handleOrderData(data);
        })
        .catch(() => {
          this.isload = false;
        });
    },
    getRebuyData() {
      let p = {
        action: "getUserBuyRate",
        OrgOID: this.curOrgOID,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        appid: base.gAppid
      };
      queryOrderData(p)
        .then(data => {
          Toast.clear();
          this.isload = false;
          this.handleRebuyData(data);
        })
        .catch(() => {
          this.isload = false;
        });
    },
    // ===============================
    // 选择分店
    onConfirm(value, index) {
      this.curOrgOID = this.orgList[index].OrgOID;
      this.curOrgName = this.orgList[index].OrgName;
      console.log(this.curOrgName);
      this.show1 = false;
    },
    // 选择时间
    onConfirm2(value) {
      this.show2 = false;
      this.currentDate1 = value;
      this.dateStart = tools.formatDate(value);
    },
    onConfirm3(value) {
      this.show3 = false;
      this.currentDate2 = value;
      this.dateEnd = tools.formatDate(value);
    },
    onChange(picker, value, index) {},
    //--chart 数据操作
    handleBrandData(data) {
      if (!data.SaleListGroupByBrand) {
        this.brandData = {
          tableData: [],
          chartData: []
        };
        return false;
      }
      let pieChartData = this.handleChartData(
        data.SaleListGroupByBrand,
        "BrandName",
        "SkuPriceSummary"
      );
      let tableData = this.handleTableData(
        data.SaleListGroupByBrand,
        "BrandName",
        "SkuPriceSummary",
        "SkuCountSummary"
      );
      let obj = {
        tableData: tableData,
        chartData: pieChartData
      };
      this.brandData = obj;
    },
    handCateData(data) {
      if (!data.SaleListGroupByCategory) {
        this.classifyData = {
          tableData: [],
          chartData: []
        };
        return false;
      }
      let pieChartData = this.handleChartData(
        data.SaleListGroupByCategory,
        "CategoryName",
        "SkuPriceSummary"
      );
      let tableData = this.handleTableData(
        data.SaleListGroupByCategory,
        "CategoryName",
        "SkuPriceSummary",
        "SkuCountSummary"
      );
      let obj = {
        tableData: tableData,
        chartData: pieChartData
      };
      this.classifyData = obj;
    },
    handleOrderData(data) {
      let pieChartList = data;
      let pieChartData = this.handleChartData(
        pieChartList,
        "stepContent",
        "count"
      );
      let tableList = data;
      tableList.forEach(item => {
        item.rate = (item.rate * 100).toFixed(2);
      });
      let tableData = this.handleTableData(
        tableList,
        "stepContent",
        "count",
        "rate"
      );
      let obj = {
        tableData: tableData,
        chartData: pieChartData
      };
      this.orderData = obj;
    },
    handleRebuyData(data, nameProp, valProp) {
      let pieChartData = this.handleChartData(data, "count", "userCount");
      let tableData = this.handleTableData(
        data,
        "count",
        "userCount",
        "userName"
      );
      let obj = {
        tableData: tableData,
        chartData: pieChartData
      };
      this.rebuyData = obj;
    },
    querySumStoreSucc(data) {
      let saleRankList = data.data;
      let chartList = data.data;
      let peopleFlowList = common.arraySort(
        data.data,
        "UserVisitOfflineCount",
        "desc"
      );
      let totolVisit = 0;
      peopleFlowList.forEach(ele => {
        ele.showVisit =
          (
            Number(ele.UserVisitOfflineCount) /
            Number(peopleFlowList[0].UserVisitOfflineCount)
          ).toFixed(4) *
            100 +
          "%";
        totolVisit += Number(ele.UserVisitOfflineCount);
      });
      peopleFlowList.forEach(ele => {
        ele.avgVisitCount = (
          (Number(ele.UserVisitOfflineCount) / Number(totolVisit)) *
          100
        ).toFixed(2);
      });
      let arr1 = this.handleProgressData(
        saleRankList,
        "OrgName",
        "TotlePriceSum",
        "SalePercentage"
      );
      let arr2 = this.handleProgressData(
        peopleFlowList,
        "OrgName",
        "UserVisitOfflineCount",
        "avgVisitCount"
      );
      let chartData = this.handlePrecustomData(
        chartList,
        "OrgName",
        "OrderPriceAverage"
      );
      this.saleRankData = arr1;
      this.peopleFlowData = arr2;
      this.preCustomData = chartData;
    },
    //===
    handleChartData(data, nameProp, valProp) {
      let BrandList = common.arraySort(data, valProp, "desc");
      let pieChartData = [];
      let otherPriceSum = 0;
      if (BrandList.length > 10) {
        for (let i = 0; i < BrandList.length; i++) {
          if (i < 9) {
            let pieChartObj = {};
            pieChartObj.name = BrandList[i][nameProp];
            pieChartObj.data = BrandList[i][valProp];
            pieChartData.push(pieChartObj);
          } else {
            otherPriceSum = otherPriceSum + BrandList[i].SkuPriceSummary;
          }
        }
        let pieChartObj2 = {};
        pieChartObj2.name = "其他";
        pieChartObj2.data = parseInt(otherPriceSum.toFixed(2));
        pieChartData.push(pieChartObj2);
      } else {
        for (let i = 0; i < BrandList.length; i++) {
          let pieChartObj = {};
          pieChartObj.name = BrandList[i][nameProp];
          pieChartObj.data = BrandList[i][valProp];
          pieChartData.push(pieChartObj);
        }
      }
      let chartDataList = pieChartData;
      let columns = ["name", "data"];
      let rows = [];
      for (let i = 0; i < chartDataList.length; i++) {
        let eleObj = {
          name: chartDataList[i].name,
          data: chartDataList[i].data
        };
        rows.push(eleObj);
      }
      let chartobj = {
        columns: columns,
        rows: rows
      };
      let chartData = chartobj;
      return chartData;
    },
    handleTableData(data, prop1, prop2, prop3) {
      let tableData = [];
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let obj = {
          val1: item[prop1],
          val2: item[prop2],
          val3: item[prop3]
        };
        tableData.push(obj);
      }
      return tableData;
    },
    handleProgressData(data, nameProp, valProp, rateProp) {
      let progressData = common.arraySort(data, valProp, "desc");
      let progressList = [];
      progressData.forEach(ele => {
        let item = {};
        item.rateVal =
          (Number(ele[valProp]) / Number(progressData[0][valProp])).toFixed(4) *
          100;
        item.val1 = ele[nameProp];
        item.val2 = ele[valProp];
        item.val3 = ele[rateProp];
        progressList.push(item);
      });
      return progressList;
    },
    handlePrecustomData(data, nameProp, valProp) {
      let chartData = common.arraySort(data, valProp, "desc");
      let list = [];
      chartData.forEach(ele => {
        let obj = {
          仓库名称: ele[nameProp],
          "客单价(元)": ele[valProp]
        };
        list.push(obj);
      });
      return list;
    }
    //===
  }
};
</script>
<style scoped lang='less'>
.orgStatisticsNew {
  padding-top: 5px;
  background-color: #e7eaf1;
  .top {
    width: 100%;
    flex-direction: row !important;
    justify-content: space-around;
    padding: 0 2px;
    .btn {
      width: 115px;
      height: 80px;
      box-shadow: 0 0 5px #bcbcbc;
      padding-top: 10px;
      justify-content: space-around;
      align-items: center;
      background: #f5f5f5;
      span:nth-child(1) {
        color: #333;
        font-weight: 600;
        font-size: 18px;
      }
      span:nth-child(2) {
        color: #666;
        font-weight: 400;
        font-size: 16px;
        .van-loading__circular {
          color: #333 !important;
        }
      }
    }
  }
  .query {
    height: 90px;
    .btn {
      width: 80%;
      height: 34px;
      border-radius: 15px;
      background-color: #ffe002;
      color: black !important;
      box-shadow: 0 0 5px #bcbcbc;
      font-size: 16px;
      line-height: 34px;
      span {
        color: #000;
        font-weight: 500;
      }
    }
  }
  .section-wrap {
    .section {
      margin: 0px 5px;
      box-shadow: 0 0 3px #bcbcbc;
      border-radius: 5px;
      font-size: 14px;
      background: white;
      .title {
        padding: 10px;
        border-bottom: 1px solid #f0f0f0;
        font-size: 16px;
        font-weight: 600;
      }
      .height {
        height: 80px;
      }
      .smar {
        margin-bottom: 10px;
        font-weight: 600;
        font-size: 20px;
      }
      .part1 {
        padding: 15px 0;
        > div {
          justify-content: space-between;
          align-items: center;
          span:nth-child(1) {
            font-size: 20px;
            font-weight: 600;
          }
          span:nth-child(2) {
            font-size: 14px;
            color: #666;
          }
        }
      }
      .prog {
        height: 40px;
        padding: 10px 20px 0;
      }
      // 访问统计具体
      .count {
        flex-wrap: wrap;
        .count-son {
          width: 33.33%;
          padding-bottom: 5px;
          padding-top: 5px;
          border-bottom: 0.5px solid #eaeaea;
          border-right: 0.5px solid #eaeaea;
          .sum {
            height: 20px;
            line-height: 20px;
            text-align: center;
            font-weight: 600;
          }
          .count-name {
            height: 40px;
            img {
              width: 20px;
              height: 20px;
              background-color: blue;
              margin-right: 5px;
            }
            div {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
