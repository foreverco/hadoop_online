<template>
  <div class="forgetBox">
    <el-dialog title="修改密码" :visible.sync="dialog_flag" @close="close">
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
          <el-input v-model.number="ruleForm.phone" autocomplete="off" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="indentcode">
          <el-input
            v-model.number="ruleForm.indentcode"
            autocomplete="off"
            placeholder="请输入验证码"
            style="width:50%;margin-right: 30%"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            :disabled="!codeBtnStatus.status"
            @click="getCode"
          >{{ codeBtnStatus.codemsg }}</el-button>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <div style="display:flex;justify-content: center;margin-top:20px">
          <el-button
            style="width:90%"
            type="primary"
            size="medium"
            @click="submitForm('ruleForm')"
          >注册</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { validatePhone } from "@/util/validate";
export default {
  name: "ForgetPass",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    flag(newVal) {
      console.log(newVal);
      this.dialog_flag = newVal;
    }
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialog_flag: false,
      codeBtnStatus: {
        status: true,
        codemsg: "请输入验证码",
        codeTimer: null
      },
      ruleForm: {
        phone: "",
        indentcode: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        indentcode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  methods: {
    close() {
      this.$emit("update:flag", false);
      this.resetForm();
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    // 获取验证码
    getCode() {
      let phoneNum = this.ruleForm.phone;
      if (!phoneNum) {
        this.$notify.error({
          title: "错误",
          message: "手机号不能为空"
        });
        return;
      } else if (validatePhone(phoneNum)) {
        this.$notify.error({
          title: "错误",
          message: "手机号格式不正确"
        });
        return;
      } else {
        this.codeBtnStatus.status = false;
        this.codeBtnStatus.codemsg = "发送中...";
        this.codeTimerFun(5);
      }
    },
    /* 验证码倒计时 */
    codeTimerFun(number) {
      let time = number;
      this.codeBtnStatus.codeTimer = setInterval(() => {
        this.codeBtnStatus.codemsg = `倒计时${time}s`;
        time--;
        if (time == 0) {
          clearInterval(this.codeBtnStatus.codeTimer);
          this.codeBtnStatus.codemsg = "重新发送";
          this.codeBtnStatus.status = true;
        }
      }, 1000);
    },
    // 提交注册
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.close();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.forgetBox {
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .clearfix {
    span {
      font-size: 22px;
    }
  }
  .el-dialog {
  }
  .el-form {
    // width: 600px;
    margin-bottom: 20px;
    .el-form-item {
      padding: 0 20px;
      margin: 30px 0;
    }
    .toLogin {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 20px;
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
</style>
