<template>
  <div class="surveyBox">
    <div class="surveyTop" v-if="$route.path == '/personal/survey'">
      <div class="typeBox">
        用户身份:
        <span>种植户</span>
      </div>
      <div class="btnBox">
        <el-button type="success" icon="el-icon-plus" @click="addSurvey"
          >新建</el-button
        >
        <el-button type="success">一键导入</el-button>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "Survey",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    addSurvey() {
      this.$router.push({ path: "/personal/survey/add" });
    }
  }
};
</script>
<style lang="scss" scoped>
.surveyBox {
  .surveyTop {
    border: 1px solid red;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .typeBox {
      span {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: $maincolor;
      }
    }
    .btnBox {
      .el-button {
        width: 137px;
      }
    }
  }
}
</style>
