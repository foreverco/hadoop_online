<template>
  <div class="perCenter">
    <!-- {{ userMsg }} -->
    <el-form ref="perForm" :model="perForm" label-width="80px">
      <el-form-item label="手机号">
        <el-input disabled v-model="userMsg.info.mobile"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="perForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="perForm.sex" :label="0">男</el-radio>
        <el-radio v-model="perForm.sex" :label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="地区">
        <el-cascader
          v-model="perForm.area"
          :options="area_options"
          :props="area_props"
        ></el-cascader>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCity } from "../../../api/common";
export default {
  name: "PerCenter",
  data() {
    return {
      perForm: {
        userName: "",
        sex: 1,
        area: ""
      },
      area_props: {
        value: "code",
        label: "name",
        lazy: true,
        lazyLoad(node, resolve) {
          const level = node.level;
          // 请求参数
          const requestData = {};
          // 省份
          if (level === 0) {
            requestData.type = "province";
          } // 城市
          if (level === 1) {
            requestData.type = "province";
            requestData.code = node.value;
          }
          console.log(node);
          resolve(node);
          getCity(requestData).then(res => {
            resolve(res);
            // console.log(res);
          });
        }
      },
      area_options: []
    };
  },
  computed: {
    tokenMsg() {
      return this.$store.state.app.token;
    },
    isLogin() {
      return this.$store.state.app.isLogin;
    },
    userMsg() {
      console.log(typeof this.$store.state.app.userInfo);
      if (typeof this.$store.state.app.userInfo == "string") {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    }
  }
};
</script>
<style lang="scss">
.perCenter {
  // border: 1px solid red;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    // border: 1px solid red;
    width: 600px;
  }
}
</style>
