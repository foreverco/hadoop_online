<template>
  <div>
    <el-cascader
      v-model="area"
      :placeholder="initValue"
      :options="area_options"
      :props="area_props"
      @change="changeValue"
      class="cascader"
    ></el-cascader>
  </div>
</template>
<script>
import { reqAdress } from "@/api/map";
export default {
  name: "Cascader",
  data() {
    const _this = this;
    return {
      initValue: "请选择省市区",
      adress: [],
      adressData: {},
      area: [],
      area_props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const level = node.level;
          // 请求参数
          const requestData = {};
          const areaType = {
            0: { type: "province" },
            1: { type: "city" },
            2: { type: "area" }
          };
          requestData.type = areaType[level].type;
          level === 0 ? (requestData.id = "0") : (requestData.id = node.value);

          reqAdress(requestData).then(res => {
            const data = res.data.data;
            data.forEach(item => {
              item.value = item[`${areaType[level].type}Id`];
              item.label = item[areaType[level].type];
              if (level == 2) {
                item.leaf = level >= 2;
              }
            });
            // 存储省市区
            _this.adressData[areaType[level].type] = data;
            resolve(data);
          });
          /* 获取adress */
          if (node.level !== 0) {
            _this.getAdress(node);
          }
        }
      },
      area_options: []
    };
  },
  props: {
    areaValue: {
      type: Array,
      default: () => []
    },
    areaConfig: {
      type: Object,
      default: () => {
        return {
          // 是否联动地图
          mapLocation: false
        };
      }
    }
  },
  methods: {
    /* 初始化value */
    initPlaceHodler(val) {
      if (val) {
        this.initValue = val;
      }
    },
    changeValue(val) {
      // console.log(val);
      this.$emit("update:areaValue", val);
      // 匹配最后一项，区县
      const lastCode = val[val.length - 1];
      const area = this.adressData.area.filter(
        item => item.value === lastCode
      )[0];
      this.adress[2] = area.label;
      this.getAdress();
    },
    /* 获取中文地址 */
    getAdress(node) {
      if (node) {
        const index = node.level - 1;
        this.adress[index] = node.label;
      }
      if (this.areaConfig.mapLocation) {
        this.$emit("callback", {
          function: "setmapCenter",
          data: {
            adress: this.adress.join("")
          }
        });
      }
    }
  }
};
</script>
<style lang="scss"></style>
