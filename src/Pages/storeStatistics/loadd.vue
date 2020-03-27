<template>
  <div class="loadd">
    <div class="section-wrap"></div>
  </div>
</template>

<script>
import base from "@/assets/api/base";
import { Toast } from "vant";
import tools from "@/assets/js/tools";
import {
  getPermitOrgOID,
  getLineReport,
  getStatisticsSumAll
} from "@/assets/api/statistics";
export default {
  name: "echarts",
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.loadd {
  .section-wrap {
    .section {
      margin: 15px 5px;
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
