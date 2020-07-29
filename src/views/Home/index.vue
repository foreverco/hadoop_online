<template>
  <div class="home lvallcontainer">
    <!-- <div class="top lvcontainer">
      <img src="../../assets/images/lbt/timg.jpg" alt>
    </div>-->
    <div class="swiperBox lvallcontainer">
      <!-- 123 -->
      <SwiperVue
        :imgList="swiperList1"
        :swiperConfig="swiperConfig"
      ></SwiperVue>
    </div>
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
      <BarEchartsVue
        :result="barData"
        :barconfig="barconfig"
      ></BarEchartsVue>
    </div>
    <div class="tableBox lvcontainer">
      <TableVue :config="tableConfig"></TableVue>
    </div>
    <div class="echartsBox lvcontainer">
      <PieEchartsVue></PieEchartsVue>
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
  </div>
</template>
<script>
import AmapVue from "@/components/Amap";
import SwiperVue from "@/components/SwiperVue";
import TableVue from "@/components/TableData";
export default {
  name: "Home",
  components: {
    AmapVue,
    SwiperVue,
    TableVue
  },
  data() {
    return {
      // 表格配置
      tableConfig: {
        tHead: [
          { label: "日期", prop: "date" },
          {
            label: "类型",
            prop: "type",
            type: "function",
            callback: (row, prop) => {
              const sexItem = this.testJson[row[prop]];
              if (sexItem) {
                return sexItem.sex;
              }
              // const data = this.testArr.filter(item => item.value == row[prop]);
              // if (data && data.length > 0) {
              //   return data[0].sex;
              // }
            }
          },
          { label: "姓名", prop: "name" },
          { label: "头像", prop: "photo", type: "image" },
          { label: "地址", prop: "address" },
          { label: "操作" }
        ]
      },
      testArr: [
        { sex: "男", value: 0 },
        { sex: "女", value: 1 }
      ],
      testJson: this.$store.state.config.sex_json,
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
        },
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
        type: "line",
        keys: [
          {
            label: "收入",
            value: "sr",
            type: "line"
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

      barconfig: {
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
            type: "bar"
          }
        ]
      },
      barData: [
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
