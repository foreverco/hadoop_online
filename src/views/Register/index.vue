<template>
  <div class="lvcontainer registerBox">
    <el-card>
      <div slot="header" class="clearfix">
        <span>会员注册</span>
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
            autocomplete="off"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="indentcode">
          <el-input
            v-model.number="ruleForm.indentcode"
            autocomplete="off"
            placeholder="请输入验证码"
            style="width:50%;margin-right:16%"
          ></el-input>
          <el-button
            size="small"
            type="primary"
            :disabled="!codeBtnStatus.status"
            @click="getCode"
            >{{ codeBtnStatus.codemsg }}</el-button
          >
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            placeholder="确认密码"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="用户类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio
              v-for="(item, index) in userType"
              :key="index"
              :label="item.value"
              size="mini"
              style="margin:0 0 15px 0;width:90px"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="isRead" class="readBox">
          <el-checkbox-group v-model="ruleForm.isRead">
            <el-checkbox label="success">
              <!-- <el-link disabled>我已阅读并接受</el-link> -->
              <span>我已阅读并接受</span>
            </el-checkbox>
          </el-checkbox-group>
          <el-link type="primary" @click.stop="getXy">《用户协议》</el-link>
        </el-form-item>
        <div style="display:flex;justify-content: center;margin-top:20px">
          <el-button
            style="width:90%"
            type="primary"
            size="medium"
            @click="submitForm('ruleForm')"
            >注册</el-button
          >
        </div>
        <div class="toLogin">
          <div>
            已有账号？<span @click="$router.push({ name: 'Login' })"
              >登录平台</span
            >
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { validatePhone } from "../../util/validate";
export default {
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
      userType: [
        { label: "医药企业", value: "yiyao" },
        { label: "初加工厂", value: "jiagong" },
        { label: "种植企业", value: "planting1" },
        { label: "合作社", value: "help" },
        { label: "种植个体户", value: "planting2" },
        { label: "其他", value: "other" }
      ],

      codeBtnStatus: {
        status: true,
        codemsg: "请输入验证码",
        codeTimer: null
      },
      ruleForm: {
        pass: "",
        checkPass: "",
        phone: "",
        indentcode: "",
        type: "",
        isRead: []
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        indentcode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        isRead: [
          {
            type: "array",
            required: true,
            message: "请阅读并同意《用户协议》",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 用户协议
    getXy() {
      console.log(123);
    },
    // 重置表单
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>
<style lang="scss">
.readBox {
  // border: 1px solid red;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  .el-form-item__content {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .el-checkbox-group {
    // border: 1px solid blue;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .el-link {
    // border: 1px solid blue;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  .el-checkbox__inner {
    width: 20px;
    height: 20px;
    position: relative;
    &::after {
      width: 6px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg) scaleY(1) !important;
    }
  }
  span {
    // font-size:18px;
  }
}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
.registerBox {
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
}
</style>
