<template>
  <div class="allGate" style="background-color: #e7eaf1;">
    <div class="top row" style="padding:10px;align-items:center">
      <div class="btn column" @click="show2=true">
        <span class>{{dateStart.slice(0,10)}}</span>
        <span class>{{dateStart.slice(11,16)}}</span>
      </div>
      <span class style="font-size:20px;color:#666">~</span>
      <div class="btn column" @click="show3=true">
        <span class>{{dateEnd.slice(0,10)}}</span>
        <span class>{{dateEnd.slice(11,16)}}</span>
      </div>
    </div>
    <div class="query row pcenter">
      <Button
        class="btn"
        color="#ffe002"
        @click="query"
        :loading="isload"
        type="info"
        loading-text="加载中..."
        :disabled="isload"
      >查 询</Button>
    </div>
    <div class>
      <!-- <div class="toplist row">
        <span class></span>
        <div class style="font-size:16px">{{orgList[index].OrgName}}</div>
      </div>-->
      <div class="count row" style="padding:10px;border-radius:3px">
        <div class="count-son column" v-for="(item,index) in DeviceList" :key="index">
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
import common from "@/assets/js/common";
import base from "@/assets/api/base";
import tools from "@/assets/js/tools";
import { Toast, Button, Popup, DatetimePicker } from "vant";
import { getPermitOrgOID, getStatisticsSumAll } from "@/assets/api/statistics";
export default {
  name: "allGte",
  components: { Button, Popup, DatetimePicker },
  data() {
    return {
      isload: true,
      show2: false,
      show3: false,
      oidStr: "",
      orgList: [],
      DeviceList: [],
      startYear: 2018,
      endYear: 2030,
      minDate: new Date(2018, 0, 1),
      maxDate: new Date(2030, 0, 1),
      currentDate1: new Date(),
      currentDate2: new Date(),
      dateStart: "", //开始时间
      dateEnd: "" //结束时间
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
      if (startTime > endTime) {
        Toast("开始时间不能大于结束时间");
        return false;
      }
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.isload = true;
      this.getCateAll();
    },
    getPermitOrgOID() {
      //获取所有分店
      getPermitOrgOID()
        .then(data => {
          if (data.length == 0) {
            Toast("没有可查看的分店");
            return false;
          }
          this.orgList = data;
          console.log(this.orgList);
          let arr = [];
          data.forEach(v => {
            arr.push(v.OrgOID);
          });
          this.oidStr = arr.join(",");
        })
        .catch(() => {
          this.isload = false;
        })
        .then(() => {
          this.getCateAll();
        });
    },
    getCateAll() {
      //访问统计 闸机设备统计接口
      let p = {
        action: "mpGetOrgStatisticsEquipment",
        OrgOID: this.oidStr,
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
          this.DeviceList = data.DeviceList;
          console.log(this.DeviceList);
          Toast.clear();
          this.isload = false;
        })
        .catch(() => {
          this.isload = false;
        });
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.top {
  width: 100%;
  flex-direction: row !important;
  justify-content: space-around;
  padding: 0 2px;
  .btn {
    width: 45%;
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
  height: 80px;
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
.toplist {
  height: 50px;
  align-items: center;
  background-color: white;
  padding-left: 14px;
  > span {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: orange;
    margin-right: 8px;
  }
}
// 访问统计具体
.count {
  flex-wrap: wrap;
  .count-son {
    border-bottom: 0.5px solid #eaeaea;
    border-right: 0.5px solid #eaeaea;
  }
  .count-son {
    width: 33.33%;
    padding-bottom: 5px;
    padding-top: 5px;
    background-color: white;
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
</style>
