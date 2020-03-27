<template>
  <div class="echarts">
    <div class="section-wrap">
      <div class="section">
        <div class="title row pcenter" style="justify-content:space-between;margin-bottom:20px">
          <span>{{comData.title}}</span>
          <div class="collasp pcenter" @click="showDetail = !showDetail">
            <span class="pcenter">明 细</span>
          </div>
        </div>
        <div class="canvas" :style="{height:height}">
          <ve-pie
            :data="comData.chartData"
            :settings="chartSettings"
            v-show="isChart"
            :legend="legend"
            :tooltip="tooltip"
          ></ve-pie>
        </div>
        <div class="chart" v-show="showDetail">
          <div class="row row1 pcenter" style="height:50px">
            <div class style="flex:1">{{comData.tableTitle1}}</div>
            <div class="" style="width:120px;padding-left:16px">{{comData.tableTitle2}}</div>
            <div class="pcenter" style="width:60px">{{comData.tableTitle3}}</div>
          </div>
          <div class="row row2 pcenter" style="height:40px" v-for="(item,index) in comData.tableData" :key="index">
            <div class style="flex:1">{{item.val1}}</div>
            <div class="" style="width:120px;padding-left:18px"><span class="" v-if="money">￥</span>{{item.val2}}</div>
            <div class="pcenter" style="width:60px">{{item.val3}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pieCount",
  props: {
    height: {
      type: String,
      default: "350px"
    },
    money: {
      type: Boolean,
      default: false
    },
    comData: Object,
    radius: {
      type: Number,
      default: 76
    }
  },
  data() {
    return {
      showDetail:false,
      chartSettings: {
        radius: this.radius
      },
      legend: {
        itemGap: 3,
        itemHeight: 6,
        itemWidth: 10,
        textStyle: {
          fontSize: 12,
          lineHeight: 12
        },
        rich: {}
      },
      tooltip: {
        show: true,
        trigger: "item",
        formatter: "{b}: {c} ({d}%)",
        position: ["25%", "20%"]
      }
    };
  },
  created() {
    
  },
  methods: {},
  computed: {
    isChart: function() {
      let that = this,
        radius = that.radius,
        comData = that.comData;
      let isChart = true;
      if (
        comData.chartData &&
        comData.chartData.rows &&
        comData.chartData.rows.length <= 0
      ) {
        isChart = false;
      }
      return isChart;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.echarts {
  .section-wrap {
    .section {
        margin: 2px 5px;
        box-shadow: 0 0 3px #bcbcbc;
        border-radius: 5px;
        font-size: 14px;
        background: white;
        .title {
            padding: 10px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 16px;
            font-weight: 600;
            .collasp{
              width:60px;
              height:30px;
              span{
                display: block;
                padding:3px 8px;
                background-color:#FFE002;
                font-size:15px;
                border-radius:4px;
                color:#333;
              }
            }
        }
        .canvas {
            overflow: hidden;
        }
       .chart {
           transform: translateY(-10px);
          margin: 0 10px;
            .row1 {
                background-color:#eaeaea;
                >div{
                    padding-left:5px
                }
            }
            .row2{
                border-bottom: 1px solid #eaeaea;
            }
        }
    }
  }
}
</style>
