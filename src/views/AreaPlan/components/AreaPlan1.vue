<template>
  <div class="AreaPlanmap lvcontainer">
    <div class="checkBox">
      <el-form>
        <el-form-item label="年份选择">
          <el-select v-model="year" placeholder="请选择">
            <el-option
              v-for="item in years"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域选择">
          <el-select v-model="area" placeholder="请选择">
            <el-option
              v-for="item in areas"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="中药材名">
          <el-select v-model="drug" placeholder="请选择">
            <el-option
              v-for="item in drugs"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success">确认</el-button>
          <el-button type="success">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mapContainer">
      <div class="mapBox">
        <mapVue></mapVue>
      </div>
    </div>
  </div>
</template>
<script>
import mapVue from "@/components/Amap";
export default {
  name: "AreaPlan1",
  components: {
    mapVue
  },
  data() {
    return {
      year: "",
      area: "",
      drug: "",
      years: [
        { label: "2020", value: 2020 },
        { label: "2019", value: 2019 },
        { label: "2018", value: 2018 }
      ],
      areas: [
        { label: "呼伦贝尔", value: "001" },
        { label: "呼和浩特", value: "002" }
      ],
      drugs: [
        { label: "黄芪", value: "1" },
        { label: "板蓝根", value: "2" }
      ]
    };
  }
};
</script>
<style lang="scss">
.AreaPlanmap {
  .checkBox {
    // border: 1px solid red;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 20px;
    .el-form {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .el-form-item {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 30px;
        .el-button {
          &:last-child {
            background: $sencondcolor;
            border: 1px solid $sencondcolor;
          }
        }
      }
    }
  }
  .mapContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $boxbg;
    padding: 30px 100px;
    .mapBox {
      width: 100%;
      height: calc(100vh - 200px);
    }
  }
}
</style>
