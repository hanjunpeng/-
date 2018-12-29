<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import '../../../common/reset.css';
</style>

<script>
import vconsole from 'vconsole';
export default {
  data() {
    return {

    }
  },
  created(){
    if(window.location.href.match("debug=true")){
        new vconsole(); 
    } 
  }
}
</script>

