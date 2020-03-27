<template>
  <div class="echarts">
    <pie-count :comData="orderData" :radius="radius" ></pie-count>
  </div>
</template>

<script>
import pieCount from "./pieCount";
export default {
  name: "orderCount",
  components: { pieCount },
  props: {
    data: Object
  },
  data() {
    return {
      orderData: {
        title: "订单统计",
        tableTitle1: "订单额（元）",
        tableTitle2: "人数（个）",
        tableTitle3: "百分比（%）",
        chartData: [],
        tableData: []
      },
      radius: 45
    };
  },
  created() {},
  methods: {},
  watch: {
    data() {
      let data = this.data;
      this.orderData.chartData = data.chartData;
      this.orderData.tableData = data.tableData;
      this.orderData.tableData.forEach(ele => {
        ele["val3"] = Number(ele["val3"]).toFixed(2);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.echarts {
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
    }
  }
}
</style>
