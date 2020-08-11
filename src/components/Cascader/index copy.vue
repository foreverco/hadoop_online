<template>
  <div>
    <el-cascader
      v-model="area"
      :options="area_options"
      :props="area_props"
      @change="changeValue"
    ></el-cascader>
  </div>
</template>
<script>
import { reqAdress } from "@/api/map";
export default {
  name: "Cascader",
  data() {
    return {
      area: [],
      area_props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const level = node.level;
          // 请求参数
          const requestData = {};
          const areaType = {
            0: {
              type: "province"
            },
            1: {
              type: "city"
            },
            2: {
              type: "area"
            }
          };

          // // 省份
          // if (level === 0) {
          //   requestData.id = "0";
          // } // 城市
          // if (level === 1) {
          //   requestData.id = node.value;
          // }
          // // 区县
          // if (level === 2) {
          //   requestData.id = node.value;
          // }
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
            // if (level == 0) {
            //   data.forEach(item => {
            //     item.value = item.provinceId;
            //     item.label = item.province;
            //   });
            // }
            // if (level == 1) {
            //   data.forEach(item => {
            //     item.value = item.cityId;
            //     item.label = item.city;
            //   });
            // }
            // if (level == 2) {
            //   data.forEach(item => {
            //     item.value = item.areaId;
            //     item.label = item.area;
            //     item.leaf = level >= 2;
            //   });
            // }
            resolve(data);
          });
        }
      },
      area_options: []
    };
  },
  props: {
    areaValue: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeValue(val) {
      console.log(val);
      this.$emit("update:areaValue", val);
    }
  }
};
</script>
<style lang="scss"></style>
