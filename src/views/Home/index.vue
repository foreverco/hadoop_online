<template>
  <div class="home lvallcontainer">
    <!-- <div class="top lvcontainer">
      <img src="../../assets/images/lbt/timg.jpg" alt>
    </div>-->
    <div class="swiperBox lvallcontainer">
      <!-- 123 -->
      <SwiperVue :imgList="swiperList1" :swiperConfig="swiperConfig"></SwiperVue>
    </div>
    <div class="amapVue lvcontainer">
      <AmapVue ref="amap" :options="options_map" @callback="callbackComponent"></AmapVue>
    </div>
    <div class="echartsBox lvcontainer">
      <LineEchartsVue :result="lineData" :lineconfig="lineconfig"></LineEchartsVue>
    </div>
    <div class="echartsBox lvcontainer">
      <LineEchartsVue :result="lineData1" :lineconfig="lineconfig"></LineEchartsVue>
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
import SwiperVue from "../../components/SwiperVue";
export default {
  name: "Home",
  components: {
    AmapVue,
    SwiperVue
  },
  data() {
    return {
      // 轮播图
      swiperList1: [
        {
          imgUrl:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2365875079,1507384543&fm=26&gp=0.jpg"
        },
        {
          imgUrl:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3168202692,1753805141&fm=26&gp=0.jpg"
        },
        {
          imgUrl:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1758533318,3225512303&fm=26&gp=0.jpg"
        }
      ],
      swiperConfig: {
        slidesPerView: 1
      },
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
        },
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
  .swiperBox {
    // background: pink;
    // height: 800px;
    // position: relative;
  }
  .amapVue {
    height: 500px;
  }
  .echartsBox {
    height: 500px;
  }
}
</style>
