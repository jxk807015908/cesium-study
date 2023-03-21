<template>
  <div class="page">
    <div id="cesiumBox"></div>
    <select id="mapserverselect">
      <option value="TDT">TDT</option>
      <option value="TDTZJ">TDTZJ</option>
      <option value="ArcGIS">ArcGIS</option>
      <option value="cesiumBlack">cesiumBlack</option>
      <option value="GoogleMap">GoogleMap</option>
      <option value="osm">osm</option>
      <option value="mapbox">mapbox</option>
    </select>
  </div>
</template>

<script setup lang="ts">
    import * as Cesium from 'cesium'
    import {onMounted} from 'vue'
    onMounted(() => {
        var viewer = new Cesium.CesiumWidget("cesiumBox");
        var layers=viewer.imageryLayers;
        document.getElementById('mapserverselect').onchange=function(){
            var dom=document.getElementById('mapserverselect');
            var value=dom.value;
            switch(value){
                case 'TDT':
                    var layerT=new Cesium.WebMapTileServiceImageryProvider({
                        url: "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
                        layer: "tdtBasicLayer",
                        style: "default",
                        format: "image/jpeg",
                        show: false
                    });
                    layers.addImageryProvider(layerT);
                    break;
                case'TDTZJ':
                    var layerTZ=new Cesium.WebMapTileServiceImageryProvider({
                        url: "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg",
                        layer: "tdtAnnoLayer",
                        style: "default",
                        format: "image/jpeg",
                        show: false
                    });
                    layers.addImageryProvider(layerTZ);
                    break;
                case 'ArcGIS':
                    let esriImageryProvider = new Cesium.ArcGisMapServerImageryProvider({
                        url : 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
                    });
                    layers.addImageryProvider(esriImageryProvider);
                    break;
                case 'cesiumBlack':
                    var balckMarble = new Cesium.createTileMapServiceImageryProvider({
                        url : 'https://cesiumjs.org/blackmarble',
                        credit : 'Black Marble imagery courtesy NASA Earth Observatory',
                        flipXY : true
                    });
                    balckMarble.splitDirection = Cesium.ImagerySplitDirection.LEFT;
                    layers.addImageryProvider(balckMarble);
                    break;
                case 'GoogleMap':
                    var GoogleMap = new Cesium.UrlTemplateImageryProvider({
                        url:"http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
                    });
                    layers.addImageryProvider(GoogleMap);
                    break;
                case 'osm':
                    var osm = Cesium.createOpenStreetMapImageryProvider({
                        url : 'https://stamen-tiles.a.ssl.fastly.net/toner/'  //https://stamen-tiles.a.ssl.fastly.net/watercolor/、https://stamen-tiles.a.ssl.fastly.net/toner/
                    });
                    layers.addImageryProvider(osm);
                    break;
                case 'mapbox':
                    var mapbox =new Cesium.MapboxImageryProvider({
                        mapId: 'mapbox.streets',  //mapbox提供了三种类型 mapbox.streets  mapbox.satellite mapbox.streets-basic
                        accessToken: 'sk.eyJ1IjoicG9wc3RhciIsImEiOiJjam1rZXc4cXQwYW5vM3BwOWJ3MHd5eXVtIn0.QFM5ceDQ17WwBXVssyVJYA'
                    });
                    layers.addImageryProvider(mapbox);
                    break;
            }
        }
    })
</script>

<style lang="scss" scoped>
  #cesiumBox {
    width: 100%;
    Height: 100%;
  }
  #mapserverselect {
    position: absolute;
    left: 24px;
    top: 24px;
  }
  .page {
    position: relative;
  }
</style>
