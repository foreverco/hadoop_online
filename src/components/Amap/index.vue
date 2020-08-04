<template>
  <div class="amap-wrap">
    <el-amap
      vid="amapContainer"
      :zoom="zoom"
      class="amap-demo"
      :events="events"
    >
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
import { getlgla } from "./common";
import { adressSetMapCenter } from "./location";
import { getImageLayer } from "./imageLayer";
import { amapSetMarker, amapClearMarker } from "./marker";
export default {
  name: "Amap",
  props: {
    pointList: {
      type: Array,
      default: () => []
    },
    /* 是否需要加载地图完成执行 */
    options: {
      type: Object,
      default: () => {}
    }
  },
  // watch: {
  //   options: {
  //     handler(newVal) {
  //       console.log("newVal");
  //       console.log(newVal);
  //     },
  //     immediate: true
  //   }
  // },
  data() {
    return {
      // 经纬度
      lgla: {},
      map: null,
      zoom: 15,
      imageLayer: null,
      // amapManager,
      events: {
        click: e => {
          console.log(e);
        }
      }
    };
  },
  mounted() {
    console.log(AMapManager);
    // console.log(AMap);
    this.initMap();
  },
  methods: {
    // 初始化地图
    initMap() {
      lazyAMapApiLoaderInstance.load().then(() => {
        // your code ...
        this.map = new AMap.Map("amapContainer", {
          center: [116.327911, 39.939229],
          // center: [114.039128, 41.895942],
          layers: [
            // 卫星
            new AMap.TileLayer.Satellite(),
            new AMap.TileLayer(),
            // 创建图片图层
            getImageLayer(this.imageLayer)
          ],
          zoom: this.zoom,
          pitch: 20, // 地图俯仰角度，有效范围 0 度- 83 度
          viewMode: "3D" // 地图模式
          // mapStyle: "amap://styles/grey" //设置地图的显示样式
        });
        this.map.on("click", e => {
          const lgla = getlgla(e);
          this.lgla = lgla;
          this.$emit("lgla", lgla);
          // 设置点覆盖物
          this.setmarker();
          // this.setCircle();
        });
        // this.map.on("mousedown", e => {
        //   this.setCircle();
        // });
        this.map.on("complete", () => {
          // 地图图块加载完成后触发
          // console.log("地图图块加载完成");
          this.mapLoad();
        });
      });
    },
    // 创建地图
    // createMap() {
    //   this.map = new AMap.Map("amapContainer", {
    //     center: [116.327911, 39.939229],
    //     // center: [114.039128, 41.895942],
    //     layers: [
    //       // 卫星
    //       new AMap.TileLayer.Satellite(),
    //       new AMap.TileLayer(),
    //       // 创建图片图层
    //       getImageLayer(this.imageLayer)
    //     ],
    //     zoom: this.zoom,
    //     pitch: 20, // 地图俯仰角度，有效范围 0 度- 83 度
    //     viewMode: "3D" // 地图模式
    //     // mapStyle: "amap://styles/grey" //设置地图的显示样式
    //   });
    //   this.map.on("complete", () => {
    //     // 地图图块加载完成后触发
    //     console.log("地图图块加载完成");
    //     this.mapLoad();
    //   });
    // },
    /* 地图加载完成 */
    mapLoad() {
      if (this.options.mapLoad) {
        this.$emit("callback", {
          function: "mapLoad"
        });
      }
    },
    // 销毁地图
    mapDestroy() {
      this.map && this.map.destroy();
    },
    // 定位地图中心
    setMapCenter(value) {
      adressSetMapCenter(value, this.map);
    },
    /* 设置点覆盖物 */
    setmarker() {
      amapSetMarker(this.lgla, this.map);
    },
    /* 清除点覆盖物 */
    clearMarker() {
      amapClearMarker(this.map);
    }
    /* 设置圆覆盖物 */
    // setCircle() {
    //   amapSetCircle(this.map);
    // }
  }
};
</script>
<style lang="scss" scoped>
.amap-wrap {
  height: 100%;
  width: 100%;
  position: relative;
  .input-card {
    background: #00000080;
    position: absolute;
    z-index: 103;
    bottom: 0;
    right: 0;
    padding: 20px 0px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    // width: 400px;
    .input-item {
      margin-top: 20px;
      width: 100%;
      text-align: center;
    }
  }
  // #amapContainer {
  //   width: 100%;
  //   height: 100%;
  // }
}
</style>
