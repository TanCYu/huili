<template>
  <div class="hello">
    <h2>Essential Links</h2>
    <p>你好我的</p>
    <Button>见刊</Button>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
  font-size:25px;
  width:375px;
  height:30px;
  background-color:red;
}
</style>
