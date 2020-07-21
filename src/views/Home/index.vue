<template>
  <div class="home lvallcontainer">
    <div class="top lvcontainer">123</div>
    <div class="top lvallcontainer">banner</div>
    <div class="amapVue lvcontainer">
      <AmapVue
        ref="amap"
        :options="options_map"
        @callback="callbackComponent"
      ></AmapVue>
    </div>
    <div class="echartsBox lvcontainer">
      <LineEchartsVue
        :result="lineData"
        :lineconfig="lineconfig"
      ></LineEchartsVue>
    </div>
    <div class="echartsBox lvcontainer">
      <LineEchartsVue
        :result="lineData1"
        :lineconfig="lineconfig"
      ></LineEchartsVue>
    </div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
    <div class="top lvcontainer">123</div>
  </div>
</template>
<script>
import AmapVue from "../../components/Amap";
export default {
  name: "Home",
  components: {
    AmapVue
  },
  data() {
    return {
      // 地图配置
      options_map: {
        mapLoad: true
      },
      lineconfig: {
        title: "收支情况",
        // type: "bar",
        keys: [
          {
            label: "收入",
            value: "sr",
            type: "bar"
          },
          {
            label: "支出",
            value: "zc",
            type: "line"
          }
        ]
      },
      lineData: [
        {
          date: "2020-01",
          sr: 100,
          zc: 120
        },
        {
          date: "2020-02",
          sr: 150,
          zc: 140
        },
        {
          date: "2020-03",
          sr: 180,
          zc: 110
        },
        {
          date: "2020-04",
          sr: 190,
          zc: 160
        },
        {
          date: "2020-05",
          sr: 120,
          zc: 160
        }
      ],
      lineData1: [
        {
          date: "2020-01",
          sr: 100,
          zc: 120
        },
        {
          date: "2020-02",
          sr: 150,
          zc: 140
        }
      ]
    };
  },
  methods: {
    callbackComponent(params) {
      if (params.function) {
        this[params.function](params.data);
      }
    },
    mapLoad() {
      // console.log(123);
    }
  }
};
</script>
<style lang="scss">
.home {
  .top {
    height: 100px;
  }
  .amapVue {
    height: 500px;
  }
  .echartsBox {
    height: 500px;
  }
}
</style>
