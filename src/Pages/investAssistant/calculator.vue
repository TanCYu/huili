<template>
  <div class="calculator" style="background-color: #e7eaf1;">
    <div class="toplist row">
      <span class></span>
      <div class style="font-size:16px">营运资金回报率计算器</div>
      <div class style="flex:1"></div>
      <div style="width:60px;height:100%;margin-right:14px" class="pcenter" @click="emptyJson">
        <div class="pcenter" style="width:55px;height:26px;border-radius:3px;background:red">
          <img
            src="@/assets/imgs/empty.png"
            style="width:14px;height:15px;margin-right:2px"
            alt
            class
          />
          <span class style="color:white">清除</span>
        </div>
      </div>
    </div>
    <div class="wrap" style="padding:20px">
      <div class="part1" style="background-color:#fff">
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">平均销售单价</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <input type="text" class v-model="from.avgSalePrice" />
          <span class>元</span>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">平均成本单价</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <input type="text" class v-model="from.avgCostPrice" />
          <span class>元</span>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">进货数量</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <input type="text" class v-model="from.stockNum" />
          <span class>元</span>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">计划销售数量</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <input type="text" class v-model="from.planSaleNum" />
          <span class>元</span>
        </div>
        <div class="row line">
          <div style="width:120px;font-size:15px" class="pcenter">销售期</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">30天</div>
        </div>
      </div>
      <div class="pcenter pcount">
        <Button @click="formSubmit" :loading="isload" type="info" loading-text="计算中...">计算</Button>
      </div>
      <div class="part1" style="background-color:#fff">
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">销售金额</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?dataJson.TotalSalePrice+'元':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">进货成本</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?dataJson.TotalCostPrice+'元':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">毛利(率)</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?dataJson.GrossProfit+'元'+'('+(dataJson.GrossProfitRate * 100).toFixed(2)+'%)':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">费用</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?dataJson.FixedCost+'元':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">净利润(率)</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?dataJson.NetProfit+'元'+'('+(dataJson.NetProfitRate * 100).toFixed(2)+'%)':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">售罄率</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?(dataJson.SellOutRate * 100).toFixed(2)+'%':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">平均存货成本</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?dataJson.AvgStockCost+'元':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">存货周转天数</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?dataJson.StockTurnoverDays+'天':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">营运资金回报率</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?(dataJson.CapitalReturnRate * 100).toFixed(2)+'%':''}}</div>
        </div>
        <div class="row line border">
          <div style="width:120px;font-size:15px" class="pcenter">营运资金回报额</div>
          <div class style="width:1px;height:25px;background-color:#eaeaea"></div>
          <div style="flex:1" class="pcenter">{{dataJson?dataJson.CapitalReturn+'元':''}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { investCount } from "@/assets/api/statistics";
import { Button } from "vant";
export default {
  components: { Button },
  name: "calculator",
  data() {
    return {
      isload: false,
      from: {
        avgSalePrice: "",
        avgCostPrice: "",
        stockNum: "",
        planSaleNum: ""
      },
      dataJson: null
    };
  },
  created() {},
  methods: {
    emptyJson(){
        this.from ={
            avgSalePrice: "",
            avgCostPrice: "",
            stockNum: "",
            planSaleNum: ""
        };
        this.dataJson = null;
    },
    formSubmit() {
        if(this.from.avgSalePrice==''||this.from.avgCostPrice==''||this.from.stockNum==''||this.from.planSaleNum==''){
            Toast('请输入必要参数！')
            return
        };
        this.isload = true;
        investCount(this.from).then(data => {
            console.log(data);
            this.isload= false;
            this.dataJson = data;
        });
    }
  }
};
</script>

<style scoped lang="less">
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
.part1 .line {
  height: 40px;
  align-items: center;
  font-size: 14px;

  input {
    width: 140px;
    height: 24px;
    border: 1px solid #eaeaea !important;
    margin-left: 15px;
    text-align: center;
    margin-right: 9px;
  }
}
.border {
  border-bottom: 1px solid #eaeaea;
}
.pcount {
  height: 80px;
  button {
    width: 70%;
    height: 36px;
    line-height: 36px;
    border-radius: 5px;
  }
}
</style>
