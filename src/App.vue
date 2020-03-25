<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body{
  height: 100%;
}
*{
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  background-color:#e7eaf1;
}
.column{
  display: flex;
  flex-direction: column;
}
.row{
  display: flex;
  flex-direction: row;
}
#app .pcenter{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
