<template>
  <div class="invest" style="padding-top:14px">
    <div class="toplist row">
      <span class=""></span>
      <div class="" style="font-size:16px">我的品牌列表</div>
    </div>
    <div class="pw">


    </div>
    <div class="toplist row" style="margin-top:14px;border-bottom:0.5px solid #eaeaea">
      <span class=""></span>
      <div class="" style="font-size:16px">工具箱</div>
    </div>
    <div class="tools row">
      <router-link  to="/calculator" class="part column pcenter" style="padding:10px;border-right:0.5px solid #eaeaea">
         <img src="@/assets/imgs/count.png" style="width:50px;height:50px" alt="" class="">
         <div class="pcenter" style="text-align:center;margin-top:5px">
           <span class="" style="font-size:14px">盈利资金回报率计算器</span>
         </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { investBrand } from "@/assets/api/statistics";
export default {
  name: 'invest',
  data () {
    return {
      dataJson:[]
    }
  },
  created(){
    this.getBrands();
  },
  methods: {
    getBrands(){
      investBrand().then(data=>{
        console.log(data)
        this.dataJson = data;
      })
    }
  }
}
</script>

<style scoped lang="less">
  .toplist{
    height: 50px;
    align-items:center;
    background-color:white;
    padding-left:14px;
    >span{
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background: orange;
      margin-right: 8px;
    }
  }
  .tools{
    flex-wrap:wrap;
    background: white;
    .part{
      width: 33.33%;
      height: 130px;
    }
  }
</style>
