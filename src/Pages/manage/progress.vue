<template>
    <div class="contain">
        <div class="section-wrap">
            <div class="section">
                <div class="title" style="margin-bottom:10px">{{data.title}}</div>
                <div class="box" style="padding:0 20px 10px">
                    <div class="row row1 pcenter" style="height:40px">
                        <div class style="flex:1">{{data.progressTitle1}}</div>
                        <div class="" style="width:80px;padding-left:16px">{{data.progressTitle3}}</div>
                        <div class="pcenter" style="width:60px">{{data.progressTitle2}}</div>
                    </div>
                    <div class="item column" v-for="(item,index) in data.progressList" :key="index">
                        <div class="row row1 pcenter" style="height:40px" >
                            <div class style="flex:1">{{item.val1}}</div>
                            <div class="" style="width:80px;padding-left:16px">{{item.val3}}%</div>
                            <div class="pcenter" style="width:60px">{{item.val2}}</div>
                        </div>
                        <div class="">
                            <progress-bar :barWidth="Number(item.rateVal)"></progress-bar>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ProgressBar from "../../components/ProgressBar";
  export default {
    name: 'targetCom',
    components: {
      ProgressBar
    },
    props: {
      data: Object
    },
    data () {
      return {
      }
    },
    mounted () {
      
    },
    methods: {

    },//methods
    computed: {

    },
    watch: {
      data () {
      }
    },
  }
</script>
<style lang="less" scoped>
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
        }
    }
</style>
