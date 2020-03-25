<template>
  <div class="hello">
    <proCommon :data="peopleFlowData"></proCommon>
  </div>
</template>

<script>
  import proCommon from "./progress";
  export default {
    name: "peopleRank",
    components: {
      proCommon
    },
    props: {
      data: Array
    },
    data() {
      return {
        peopleFlowData: {
          title: '人流量统计',
          progressTitle1: '门店名',
          progressTitle2: '人流量',
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
        this.peopleFlowData.progressList = data;
      }
    },

  };
</script>
<style scoped>

</style>
