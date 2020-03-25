<template>
  <div class="center">
    <div class="pcenter">
      <div class="wrap column" v-if="menuList[0] &&　menuList[0].children">
        <div class="title"><span class="">管理中心</span></div>
        <div class="order row">
          <router-link to="/orgStatistics" class="item column" v-for="(item,index) in menuList[0].children" :key="index">
              <!-- <img src="" alt="" class=""> -->
              <span class="">{{item.MenuTitle}}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import common from '@/assets/js/common';
import { getUserPagesByToken } from "@/assets/api/pcenter";
export default {
  name: 'center',
  data () {
    return {
      menuList:[]
    }
  },
  created(){
    this.getUserPagesByToken();
  },
  methods: {
    getUserPagesByToken(){
      getUserPagesByToken().then(data => {
        let menu = data;
        console.log(data);
        menu = common.arraySort(menu, "Sort", "asc");
        menu = common.makeTreeData(menu, "0");
        this.menuList = menu;
        console.log(this.menuList);
      });
    }
  }
}
</script>
<style scoped>
.center{
  height: 100%;
  align-items: center;
}
.center .wrap{
  width:350px;
  background-color: white;
  margin-top:15px;
  box-shadow: 0px 2px 2px #ccc;
  border-radius: 8px;
  padding: 15px;
}
.wrap .title{
  height:30px;
  justify-content: center;
  padding-left:5px;
  margin-bottom: 10px;
}
.wrap .title span{
  font-size:20px;
  font-weight: 600;
}
/* -- */
.order{
  flex-direction: row !important;
  flex-wrap: wrap;
}
.order .item{
  text-decoration: none;
  color:#333;
  width: 25%;
  align-items: center;
  justify-content: space-around;
  height: 80px;
}
</style>
