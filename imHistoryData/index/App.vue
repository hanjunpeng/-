<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import vconsole from 'vconsole';
export default {
  data () {
    return {

    }
  },
  created () {
    if(window.location.href.match("debug=true")){
        new vconsole(); 
    } 
  }
}
</script>

<style lang="scss">
@import '../../../common/reset.css';
</style>
