<template>
  <div class="lvcontainer loginBox">
    <el-card>
      <div slot="header" class="clearfix">
        <span>会员登录</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="left"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model.number="ruleForm.phone"
            placeholder="请输入手机号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div style="display:flex;justify-content: center;margin-top:20px">
          <el-button
            style="width:90%"
            type="primary"
            size="medium"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </div>
        <div class="forgetBox">
          <span @click="forgetPass">忘记密码 > </span>
          <div>
            没有账号？
            <span @click="$router.push({ name: 'Register' })">立即注册</span>
          </div>
        </div>
      </el-form>
    </el-card>
    <DiaLogVue :flag.sync="dialog_flag"></DiaLogVue>
  </div>
</template>
<script>
import { validatePhone } from "@/util/validate";
import DiaLogVue from "./components/dialog";
export default {
  name: "Login",
  components: {
    DiaLogVue
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (validatePhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        dialog_flag: false,
        phone: "",
        pass: ""
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        pass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    forgetPass() {
      this.dialog_flag = true;
    }
  }
};
</script>
<style lang="scss">
.loginBox {
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-card {
    .clearfix {
      span {
        font-size: 22px;
      }
    }
    .el-form {
      width: 600px;
      .el-form-item {
        padding: 0 20px;
        margin: 30px 0;
      }
      .forgetBox {
        // border: 1px solid red;
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 0 5%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          color: firebrick;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
