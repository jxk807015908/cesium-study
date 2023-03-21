<template>
  <div class="page">
    <div>
      <router-link to="/imageryProvider">imageryProvider</router-link>
      <router-link to="/test">test</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
 
</script>

<style lang="scss" scoped>
#cesiumBox {
  width: 100%;
  Height: 100%;
}
.page {
  Height: 100%;
  display: flex;
  div:nth-of-type(1) {
    flex: 0 0 200px;
    a {
      display: block;
      line-height: 26px;
      padding: 0 8px;
    }
  }
  div:nth-of-type(2) {
    flex: 1 1 0;
  }
}
</style>
