<template>
  <div class="lvallcontainer allRegister">
    <div class="lvcontainer registerBox">
      <el-card class="wowcss slideInRight">
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
          <el-form-item label="手机号" prop="mobile">
            <el-input
              v-model.number="ruleForm.mobile"
              autocomplete="off"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="图片验证" prop="captcha">
            <div class="captchaBox">
              <el-input
                type="code"
                v-model="ruleForm.captcha"
                placeholder="请输入图片验证码"
                autocomplete="off"
                style="width:50%;margin-right:16%"
              ></el-input>
              <img
                :src="captchaImg"
                @click="getImgCodeMsg"
                title="看不清，换一张"
                alt="111"
              />
            </div>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model.number="ruleForm.code"
              autocomplete="off"
              placeholder="请输入短信验证码"
              style="width:50%;margin-right:32%"
            ></el-input>
            <el-button
              size="small"
              type="info"
              :disabled="!codeBtnStatus.status"
              @click="getCode"
              >{{ codeBtnStatus.codemsg }}</el-button
            >
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordTwo">
            <el-input
              type="password"
              placeholder="确认密码"
              v-model="ruleForm.passwordTwo"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item label="用户类型" prop="userType">
            <el-radio-group v-model="ruleForm.userType">
              <el-radio
                v-for="(item, index) in userTypes"
                :key="index"
                :label="item.roleCode"
                size="mini"
                style="margin:0 0 15px 0;width:90px"
                >{{ item.roleName }}</el-radio
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
          <el-form-item class="registerBoxBtn">
            <el-button
              style="width:100%"
              type="success"
              size="medium"
              @click="submitForm('ruleForm')"
              >立即注册</el-button
            >
          </el-form-item>
          <!-- <div class="toLogin">
            <div>
              已有账号？
              <span @click="$router.push({ name: 'Login' })">登录平台</span>
            </div>
          </div> -->
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { validatePhone } from "@/util/validate";
import { getImgCode, getCode, Register } from "@/api/login";
import { WOW } from "wowjs";
export default {
  computed: {
    userTypes() {
      console.log(this.$store.state.user.userTypes);
      return this.$store.state.user.userTypes;
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
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // userType: [
      //   { label: "医药企业", value: "yiyao" },
      //   { label: "初加工厂", value: "jiagong" },
      //   { label: "种植企业", value: "planting1" },
      //   { label: "种植个体户", value: "planting2" }
      // ],
      captchaImg: "",
      codeBtnStatus: {
        status: true,
        codemsg: "获取验证码",
        codeTimer: null
      },
      ruleForm: {
        password: "",
        passwordTwo: "",
        mobile: "",
        code: "",
        captcha: "",
        captchaKey: "",
        userType: "",
        isRead: []
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        captcha: [
          { required: true, message: "请输入图片验证码", trigger: "blur" }
        ],
        passwordTwo: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        mobile: [{ required: true, validator: checkPhone, trigger: "blur" }],
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
  created() {
    this.getUserTypes();
  },
  mounted() {
    this.getImgCodeMsg();
    this.$nextTick(() => {
      /* wowjs动画 */
      let wow = new WOW({
        boxClass: "wowcss",
        animateClass: "animated",
        offset: 0,
        mobile: true,
        live: false
      });
      wow.init();
    });
  },
  methods: {
    // 获取用户类型
    ...mapActions(["getUserTypes"]),
    /* 获取图片验证码 */
    getImgCodeMsg() {
      getImgCode().then(res => {
        console.log(res);
        let params = res.data.data;
        // console.log(params);
        this.ruleForm.captchaKey = params.key;
        this.captchaImg = params.image;
        this.ruleForm.type = this.activeName;
      });
    },
    // 获取验证码
    getCode() {
      let phoneNum = this.ruleForm.mobile;
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
        getCode({ mobile: phoneNum })
          .then(res => {
            console.log(res);
            this.codeTimerFun(60);
          })
          .catch(error => {
            console.log(error);
          });
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          let registerParams = JSON.parse(JSON.stringify(this.ruleForm));
          console.log(registerParams);
          Register(registerParams).then(res => {
            console.log(res);
            // this.$router.push({ name: "ViewHomeindex" });
            this.$message.success("注册成功");
          });
          this.resetForm();
          this.$router.push("/login");
        } else {
          this.$message.error("填写必要信息");
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
.allRegister {
  background: url("../../assets/images/login/loginbg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 364px);
  padding: 20px 0;
  .registerBox {
    // padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-card {
      .clearfix {
        text-align: center;
        span {
          font-size: 24px;
          color: $maincolor;
          font-weight: 600;
        }
      }
      .el-form {
        width: 836px;
        height: 524px;
        .el-form-item {
          padding: 0 20px;
          margin: 20px 0;
          .captchaBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: nowrap;
            img {
              border: 1px solid #dcdfe6;
              border-radius: 5px;
              height: 50px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
        .registerBoxBtn {
          .el-button {
            background: #fc8a0f;
            border: 1px solid #fc8a0f;
            letter-spacing: 8px;
            font-size: 16px;
          }
        }
        // .toLogin {
        //   display: flex;
        //   justify-content: flex-end;
        //   align-items: center;
        //   margin-top: 20px;
        //   span {
        //     color: firebrick;
        //     &:hover {
        //       cursor: pointer;
        //       text-decoration: underline;
        //     }
        //   }
        // }
      }
    }
  }
}
</style>
