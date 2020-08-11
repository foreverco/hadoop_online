<template>
  <div>
    <CascaderVue
      :areaValue.sync="area"
      ref="cascader"
      @callback="callbackComponents"
      :areaConfig="{ mapLocation: true }"
    ></CascaderVue>
    <el-button @click="aaa">哈哈</el-button>
    <div class="mapBox">
      <mapVue ref="amap"></mapVue>
    </div>
  </div>
</template>
<script>
import CascaderVue from "@/components/Cascader";
import mapVue from "@/components/Amap";
export default {
  name: "Survey",
  components: {
    CascaderVue,
    mapVue
  },
  data() {
    return {
      area: []
    };
  },
  mounted() {
    this.getUserMsg();
  },
  methods: {
    aaa() {
      console.log(this.area);
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
      this.$refs.cascader.initPlaceHodler("ddddd");
    }
  }
};
</script>
<style lang="scss" scoped>
.mapBox {
  border: 1px solid red;
  height: 500px;
}
</style>
