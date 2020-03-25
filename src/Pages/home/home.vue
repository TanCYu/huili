<template>
  <div class="home column">
    <router-view/>
    <footer>
        <router-link class="part" to="/home/center">
            <img class="i1" src="../../assets/imgs/home.png" alt="">
            <img class="i2" src="../../assets/imgs/homes.png" alt="">
            <span class="">功能权限</span>
        </router-link>
        <router-link class="part" to="/home/mine">
            <img class="i1" src="../../assets/imgs/my.png" alt="">
            <img class="i2" src="../../assets/imgs/mys.png" alt="">
            <span class="">个人中心</span>
        </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  created() {
  },
  methods: {
  }
};
</script>
<style scoped>
.home{
    height: 100%;
}
.wrap {
  flex: 1;
}
footer {
  height: 50px;
  display: flex;
  background-color: white;
  flex-direction: row;
  justify-content:space-around;
  border-top:1px solid #dadada;
}
footer>.part{
    width: 200px;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.part span{
  color:#888
}
.part .i2{
  display: none;
}
.part .i1{
  display: block;
}
.router-link-active span{
  color:#000 !important;
}
.router-link-active .i2{
  display: block !important;
}
.router-link-active .i1{
  display: none !important;
}
footer img{
    width:20px;
    height: 20px;
}
</style>
