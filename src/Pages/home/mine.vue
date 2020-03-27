<template>
  <div class="mine">
    <div class="pone row" style="">
      <img src="" alt="">
      <span class="">Witte</span>
    </div>
    <div class="ptwo row">
      <span class="iconfont icon-icon-test viewCardBoxBodyIconBlockIcon" style="color:#4bb3fc;font-size:34px;"></span>
      <span class="">手机授权</span>
    </div>
    <div class="ptwo row">
      <span class="iconfont icon-pinpai viewCardBoxBodyIconBlockIcon" style="color:#ffbd30;font-size:34px;"></span>
      <span class="">绑定后台帐号</span>
    </div>
    <div class="ptwo row">
      <span class="iconfont icon-qingchu viewCardBoxBodyIconBlockIcon" style="color:#ffbd30;font-size:34px;"></span>
      <span class="">清楚缓存</span>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';
import { getUserPagesByToken } from "@/assets/api/pcenter";
export default {
  name: 'HelloWorld',
  components: { Button },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){
    this.getUserPagesByToken();
  },
  methods: {
    getUserPagesByToken(){
      getUserPagesByToken().then(data => {
        console.log(data)
      });
    }
  }
}
</script>
<style scoped lang='less'>
.mine{
    height: 100%;
}
.pone{
  background-color:white;
  height:80px;
  flex-direction:row !important;
  padding-left:20px;
  align-items:center;
  margin-top:10px;
  img{
    width:65px;
    height: 65px;
    background-color:blue;
  }
  span{
    font-size:20px;
    font-weight: 500;
    margin-left:15px;
  }
}
.ptwo{
  background-color:white;
  height:60px;
  flex-direction:row !important;
  padding-left:25px;
  align-items:center;
  margin-top:15px;
  img{
    width:35px;
    height: 35px;
    background-color:blue;
  }
  span{
    font-size:16px;
    margin-left:10px;
  }
}
</style>
