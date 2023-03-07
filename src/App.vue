<template>
  <div id="cesiumBox"></div>
</template>

<script setup>
  import * as Cesium from 'cesium'
  import {onMounted} from 'vue'
  onMounted(() => {
    const esri = new Cesium.ArcGisMapServerImageryProvider({
      url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
    });
    const viewer = new Cesium.Viewer('cesiumBox', {
      // 不创建baseLayerPicker部件
      baseLayerPicker: false,
      // 设置图像提供的程序
      imageryProvider: esri,
      // 设置世界地形，增加地图凹凸感
      terrainProvider: Cesium.createWorldTerrain({
        requestWaterMask: true,
        requestVertexNormals: true,
      })
    })
  })
</script>

<style scoped>
#cesiumBox {
  width: 100%;
  height: 100%;
}
</style>
