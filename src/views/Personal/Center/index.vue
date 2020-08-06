<template>
  <div class="perCenter">
    <el-form ref="perForm" :model="perForm" label-width="80px">
      <div class="photoBox">
        <el-avatar :size="100" fit="fill" :src="perForm.photo"></el-avatar>
        <p>
          {{ userMsg.info.username }}
        </p>
      </div>
      <el-form-item label="手机号" class="userBox">
        <el-input
          disabled
          v-model="userMsg.info.username"
          style="width:70%;margin-right:1%"
        ></el-input>
        <el-button type="primary" icon="el-icon-s-promotion">修改</el-button>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="perForm.userName" style="width:70%"></el-input>
        <p style="color:#D82A2A">用户名将在交易平台对外展示</p>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="perForm.sex" :label="0">男</el-radio>
        <el-radio v-model="perForm.sex" :label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="地区">
        <el-cascader
          v-model="perForm.area"
          :options="area_options"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-input v-model="perForm.adress"></el-input>
      </el-form-item>
      <el-form-item class="btnBox">
        <el-button type="primary">保存</el-button>
        <el-button type="primary">取消</el-button>
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
        area: [],
        adress: "",
        photo: require("../../../assets/images/nav/navlogo.png")
      },
      area_props: {
        value: "code",
        label: "name",
        lazy: true,
        lazyLoad(node, resolve) {
          // const level = node.level;
          // 请求参数
          const requestData = {};
          // 省份
          // if (level === 0) {
          //   requestData.type = "province";
          // } // 城市
          // if (level === 1) {
          //   requestData.type = "province";
          //   requestData.code = node.value;
          // }
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
      if (typeof this.$store.state.app.userInfo === "string") {
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
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    width: 600px;
    .photoBox {
      text-align: center;
      margin-bottom: 50px;
      p {
        margin: 20px 0;
      }
    }
    .el-form-item {
      &.userBox {
        .el-button {
          background: transparent;
          border: 0;
          color: #d82a2a;
          span {
            font-size: 16px;
          }
          i {
            font-size: 16px;
          }
        }
      }
      &.btnBox {
        margin-top: 70px;
        .el-button {
          width: 171px;
          background: $maincolor;
          border: 1px solid $maincolor;
          border-radius: 5px;
          &:last-child {
            background: $sencondcolor;
            border: 1px solid $sencondcolor;
          }
        }
      }
    }
  }
}
</style>
