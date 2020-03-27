<template>
  <div class="echarts">
    <div class="section-wrap">
      <div class="section">
        <div class="title" style="margin-bottom:20px">客单价统计</div>
        <div
          class
          style="width:100%; width: 100%;box-sizing:border-box;overflow:scroll;white-space: nowrap;"
        >
          <div class="canvas" :style="'width:'+ cwidth +'px'" style="height:400px;display:inline-block">
            <ve-histogram :style="'width:'+ cwidth +'px'" :data="chartData" :extend="extend" style="height:400px"></ve-histogram>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "unitpriceCount",
  props: {
    data: Array,
  },
  data() {
    this.extend = {
      series: {
        label: {
          show: true,
          position: "top",
          color: "black"
        }
      }
    };
    return {
      chartData: {
        columns: ["仓库名称", "客单价(元)"],
        rows: [],
      },
      cwidth:1500
    };
  },
  created() {
    console.log(this.data.length);
    if(this.data.length>8){
      this.cwidth = (750 + Number(this.data.length*100));
    }
  },
  methods: {},
  watch: {
    data() {
      let data = this.data;
      this.chartData.rows = data;
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
