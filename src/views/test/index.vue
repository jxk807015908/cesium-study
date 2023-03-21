<template>
  <div id="cesiumBox"></div>
</template>

<script setup lang="ts">
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
    // 设置相机
    viewer.camera.setView({
      // destination: Cesium.Cartesian3.fromDegrees(113.318977,23.114155, 2000),
      // destination: Cesium.Cartesian3.fromDegrees(107.8967,30.3223, 200000),
      // destination: Cesium.Cartesian3.fromDegrees(-74.01397868569613, 40.68589266638484,2000),
      destination: new Cesium.Cartesian3(1332761,-4662399,4137888), // 纽约
      // 方向、俯视和仰视的视角
      orientation: {
        heading: Cesium.Math.toRadians(0), // 逆时针旋转90度
        // pitch: Cesium.Math.toRadians(-45), // 设置仰角，默认-90
      }
    })
    let city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
      url: Cesium.IonResource.fromAssetId(75343)
    }))
    // 样式
    let heightStyle = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [
            ['${Height} >= 300', 'rgba(45,0,75,0.5)'],
            ['${Height} >= 200', 'rgba(102,71,151,0.5)'],
            ['${Height} >= 100', 'rgba(45,0,21,0.5)'],
            ['${Height} >= 50', 'rgba(56,25,52,0.5)'],
            ['${Height} >= 10', 'rgba(0,213,0,0.5)'],
            ['true', 'rgba(127,59,8,0.5)'],
        ]
      }
    })
    city.style = heightStyle
    // let promise = Cesium.GeoJsonDataSource.load("https://a.amap.com/jsapi_demos/static/geojson/chongqing.json")
    let promise = Cesium.GeoJsonDataSource.load("./test.geojson")
    let neighborHood;
    promise.then((dataSource) => {
      console.log(dataSource)
      viewer.dataSources.add(dataSource)
      neighborHood = dataSource.entities
      let neighborHoodsEntities = dataSource.entities.values
      for (let i = 0; i < neighborHoodsEntities.length; i++) {
        let entity = neighborHoodsEntities[0]
        if (Cesium.defined((entity.polygon))) {
          // entity.name = entity.properties.neighborhood
          // entity.polygon.material = Cesium.color.fromRandom({
          //   red: 0.1,
          //   maximumGreen: 0.5,
          //   minimumBlue: 0.5,
          //   alpha: 0.6
          // })
          // entity.polygon.classificationType = Cesium.classificationType.TERRAIN
          // let polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).position
          // let polyCenter = Cesium.boundingSphere.fromPoints(polyPositions).center
          // entity.position = Cesium.Ellipsoid.WGS84.scaleToGeocentricSurface(polyCenter)
          // 生成标签
          entity.label = {
            text: entity.name,
            showBackground: true,
            scale: 0.6,
            // horizontalOrigin: Cesium.horizontalOrigin.CENTER,
            // verticalOrigin: Cesium.verticalOrigin.BOTTOM,
            // distanceDisplayCondition: new Cesium.distanceDisplayCondition(10, 8000),
            disableDepthTestDistance: 100
          }
        }
      }
    })
  })
</script>

<style lang="scss" scoped>

</style>