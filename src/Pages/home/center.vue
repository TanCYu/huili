<template>
  <div class="center">
    <div class="pcenter">
      <div class="wrap column" v-if="menuList[0] &&　menuList[0].children">
        <div class="title">
          <span class>管理中心</span>
        </div>
        <div class="order row">
          <!-- <router-link
            to="/ticket"
            class="item column"
            v-for="(item,index) in menuList[0].children"
            :key="index"
          >
            <span
              :class="item.Icon"
              class="iconfont"
              style="font-size:26px;margin-top:10px"
              :style="{color:item.IconColor}"
            ></span>
            <span class>{{item.MenuTitle}}</span>
          </router-link> -->
          <div
            @click="href(index)"
            class="item column"
            v-for="(item,index) in menuList[0].children"
            :key="index"
          >
            <span
              :class="item.Icon"
              class="iconfont"
              style="font-size:26px;margin-top:10px"
              :style="{color:item.IconColor}"
            ></span>
            <span class>{{item.MenuTitle}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import common from "@/assets/js/common";
import { getUserPagesByToken } from "@/assets/api/pcenter";
export default {
  name: "center",
  data() {
    return {
      menuList: []
    };
  },
  created() {
    if (sessionStorage.getItem("menuList")) {
      this.menuList = JSON.parse(sessionStorage.getItem("menuList"));
    } else {
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
      this.getUserPagesByToken();
    }
  },
  methods: {
    getUserPagesByToken() {
      getUserPagesByToken().then(data => {
        Toast.clear();
        let menu = data;
        console.log(data);
        menu = common.arraySort(menu, "Sort", "asc");
        menu = common.makeTreeData(menu, "0");
        this.menuList = menu;
        console.log(this.menuList);
        sessionStorage.setItem("menuList", JSON.stringify(this.menuList));
      });
    },
    href(index){
      if(index == 1){
        this.$router.push('/invest')
      }else if(index ==2){
        this.$router.push('/allGate')
      }else if(index==3){
        this.$router.push('/orgStatistics')
      }else if(index ==7){
        this.$router.push('/ticket')
      }
    }
  }
};
</script>
<style scoped>
.center {
  height: 100%;
  align-items: center;
}
.center .wrap {
  width: 350px;
  background-color: white;
  margin-top: 15px;
  box-shadow: 0px 2px 2px #ccc;
  border-radius: 8px;
  padding: 15px;
}
.wrap .title {
  height: 30px;
  justify-content: center;
  padding-left: 5px;
  margin-bottom: 10px;
}
.wrap .title span {
  font-size: 20px;
  font-weight: 600;
}
/* -- */
.order {
  flex-direction: row !important;
  flex-wrap: wrap;
}
.order .item {
  text-decoration: none;
  color: #333;
  width: 25%;
  align-items: center;
  justify-content: space-around;
  height: 80px;
}
</style>
