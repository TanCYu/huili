<template>
  <div class="hello">
    <proCommon :data="saleRankData"></proCommon>
  </div>
</template>

<script>
  import proCommon from "./progress";
  export default {
    name: "saleRank",
    components: {
      proCommon
    },
    props: {
      data: Array
    },
    data() {
      return {
        saleRankData: {
          title: '销售排行榜',
          progressTitle1: '门店名',
          progressTitle2: '销售金额',
          progressTitle3: '占比',
          progressList: []
        }
      };
    },
    mounted() {
    },
    methods: {
    },
    watch: {
      data () {
        let data = this.data;
        this.saleRankData.progressList = data;
      }
    },

  };
</script>
<style scoped>

</style>
