<template>
  <div class="mapBox lvcontainer">
    <mapVue ref="amap" :options="options_map" @callback="callbackComponent"></mapVue>
    <div class="datepickBox">
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button type="success">热力图</el-button>
    </div>
    <div class="adressList">
      <p class="adressListTitle">监测站</p>
      <div class="CascaderBox">
        <CascaderVue
          :areaValue.sync="area"
          ref="cascader"
          @callback="callbackComponents"
          :areaConfig="{ mapLocation: true }"
        ></CascaderVue>
      </div>
      <ul>
        <li>
          <span>设备列表</span>
          <span>20</span>
        </li>
        <li class="list" v-for="(item, index) in monitorList" :key="index">
          <span>{{ item.name }}</span>
          <i class="el-icon-place"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mapVue from "@/components/Amap";
import CascaderVue from "@/components/Cascader";
export default {
  name: "WarningModle",
  components: {
    mapVue,
    CascaderVue
  },
  data() {
    return {
      // 日期范围
      value1: [],
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      area: [],
      // 地图配置
      options_map: {
        mapLoad: true
      },
      monitorList: [
        {
          name: "1号监测站",
          code: "001"
        },
        {
          name: "1号监测站",
          code: "001"
        },
        {
          name: "1号监测站",
          code: "001"
        },
        {
          name: "1号监测站",
          code: "001"
        },
        {
          name: "1号监测站",
          code: "001"
        },
        {
          name: "1号监测站",
          code: "001"
        },
        {
          name: "1号监测站",
          code: "001"
        },
        {
          name: "1号监测站",
          code: "001"
        }
      ]
    };
  },
  mounted() {
    this.getUserMsg();
  },
  methods: {
    callbackComponent(params) {
      if (params.function) {
        this[params.function](params.data);
      }
    },
    mapLoad() {
      console.log(123);
    },
    callbackComponents(params) {
      if (params.function) {
        this[params.function](params.data.adress);
      }
    },
    setmapCenter(data) {
      this.$refs.amap.setMapCenter(data);
      console.log(data);
    },
    getUserMsg() {
      this.$refs.cascader.initPlaceHodler("省/市/区");
    }
  }
};
</script>
<style lang="scss">
.mapBox {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
    height: 49px;
    border: 1px solid transparent;
  }
  .el-date-editor .el-range-separator {
    line-height: 40px;
  }
  .el-date-editor .el-range__icon {
    line-height: 42px;
  }
  .el-date-editor .el-range-input {
    width: 50%;
  }
  .el-date-editor .el-range-separator {
    width: 10%;
  }
  .el-button {
    border-radius: 0 5px 5px 0;
    span {
      color: #ffffff;
    }
  }
  .el-input__inner {
    background: #ffffff !important;
  }
  .adressList {
    .el-cascader {
      width: 95% !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.mapBox {
  // border: 1px solid red;
  position: relative;
  height: 773px;
  .datepickBox {
    position: absolute;
    top: 23px;
    right: 10%;
    z-index: 106;
    width: 510px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-date-editor {
      border-radius: 5px 0 0 5px;
      // border: 1px solid red;
    }
    .el-button {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      span {
        color: #ffffff;
      }
    }
  }
  .adressList {
    position: absolute;
    top: 23px;
    left: 5%;
    z-index: 106;
    border: 1px solid #ccc;
    width: 260px;
   //  height: 742px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.34);

    .adressListTitle {
      height: 52px;
      line-height: 52px;
      background: rgba(58, 181, 76, 1);
      text-align: center;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }
    .CascaderBox {
      text-align: center;
      margin: 10px 0;
    }
    ul {
      // border: 1px solid red;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 18px;
        &:first-child {
          span {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: bold;
            color: $maincolor;
          }
        }
        &.list {
          &:hover {
            background: #3ab54c20;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
