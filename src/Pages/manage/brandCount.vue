<template>
  <div class="echarts">
    <pie-count :comData="brandData" :money="true"></pie-count>
  </div>
</template>

<script>
import pieCount from "./pieCount";
export default {
  name: "brandCount",
  components: { pieCount },
  props: {
    data: Object
  },
  data() {
    return {
        brandData: {
          title: '品牌统计',
          tableTitle1: '品牌名',
          tableTitle2: '金额',
          tableTitle3: '数量',
          chartData: [],
          tableData: []
        }
    };
  },
  created() {
    console.log(this.data);
  },
  methods: {},
  watch: {
    data() {
      let data = this.data;
      this.brandData.chartData = data.chartData;
      this.brandData.tableData = data.tableData;
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
