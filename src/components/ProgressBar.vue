<template>
  <div class="progressContainer">
    <div class="progressItem" :style="{width: barWidth + '%'}"></div>
  </div>
</template>

<script>
  export default {
    name: 'progressBar',
    props: {
      barWidth: Number,
      containerWidth: Number
    },
    data () {
      return {

      }
    },
    mounted () {
      this.$nextTick(() => {
      })
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
.progressContainer{
   position: relative;
    height: 13px;
    line-height: 13px;
    width: 100%;
    background-color: #e4e4e4;
    border-radius: 5px;
    .progressItem{
      position: absolute;
      height: 12px;
      width: 100%;
      background-color: rgb(56, 188, 87);
      border-radius: 5px;
      background-image: linear-gradient(100deg,
        rbga(255, 255, 255, .15) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, .15) 50%,
        rgba(255, 255, 255, .15) 75%,
        transparent 75%, transparent);
      background-color: rgb(56, 188, 87);
    }
}

   
    
      

</style>
