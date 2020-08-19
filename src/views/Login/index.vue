<template>
  <div class="lvallcontainer allLogin">
    <div class="lvcontainer loginBox">
      <div class="imgBox">
        <img src="../../assets/images/login/loginLogo.png" alt="" />
        <!-- <img src="" alt=""> -->
      </div>
      <el-card>
        <el-tabs
          class="wow slideInRight"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane label="密码登录" name="PASSWORD">
            <el-form
              :model="passForm"
              status-icon
              :rules="passrules"
              ref="passForm"
              label-position="left"
              class="demo-ruleForm"
            >
              <el-form-item prop="mobile">
                <el-input
                  v-model.number="passForm.mobile"
                  placeholder="请输入手机号"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="secret">
                <el-input
                  type="password"
                  v-model="passForm.secret"
                  placeholder="请输入密码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="captcha">
                <div class="captchaBox">
                  <el-input
                    type="code"
                    v-model="passForm.captcha"
                    placeholder="请输入验证码"
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
              <div
                class="loginBtn"
                style="display:flex;justify-content: center;margin-top:20px"
              >
                <el-button
                  style="width:95%"
                  type="success"
                  size="medium"
                  :disabled="canLogin"
                  @click="submitForm('passForm')"
                  >登录</el-button
                >
              </div>
              <div class="forgetBox">
                <span @click="forgetPass">忘记密码 ></span>
                <div>
                  没有账号？
                  <span @click="$router.push({ name: 'Register' })"
                    >立即注册</span
                  >
                </div>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="SMS">
            <el-form
              :model="phoneForm"
              status-icon
              :rules="phonerules"
              ref="phoneForm"
              label-position="left"
              class="demo-ruleForm"
            >
              <el-form-item prop="mobile">
                <el-input
                  v-model.number="phoneForm.mobile"
                  placeholder="请输入手机号"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item prop="code">
              <div class="captchaBox">
                <el-input
                  type="code"
                  v-model="phoneForm.captcha"
                  placeholder="请输入验证码"
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
            </el-form-item> -->
              <el-form-item prop="secret">
                <div class="captchaBox">
                  <el-input
                    v-model.number="phoneForm.secret"
                    autocomplete="off"
                    placeholder="请输入验证码"
                    style="width:50%;margin-right:16%"
                  ></el-input>
                  <el-button
                    size="small"
                    type="success"
                    :disabled="!codeBtnStatus.status"
                    @click="getCode"
                    >{{ codeBtnStatus.codemsg }}</el-button
                  >
                </div>
              </el-form-item>
              <div
                class="loginBtn"
                style="display:flex;justify-content: center;margin-top:20px"
              >
                <el-button
                  style="width:95%"
                  type="success"
                  size="medium"
                  :disabled="canLogin"
                  @click="submitForm('phoneForm')"
                  >登录</el-button
                >
              </div>
              <div class="forgetBox">
                <span @click="forgetPass">忘记密码 ></span>
                <div>
                  没有账号？
                  <span @click="$router.push({ name: 'Register' })"
                    >立即注册</span
                  >
                </div>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <DiaLogVue :flag.sync="dialog_flag"></DiaLogVue>
  </div>
</template>
<script>
import { validatePhone } from "@/util/validate";
import DiaLogVue from "./components/dialog";
import { getImgCode, getCode } from "../../api/login";
import { WOW } from "wowjs";
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
      dialog_flag: false,
      // 按钮状态
      canLogin: true,
      activeName: "PASSWORD",
      captchaImg: "",
      codeBtnStatus: {
        status: true,
        codemsg: "发送验证码",
        codeTimer: null
      },

      passForm: {
        mobile: "",
        secret: "",
        type: "",
        captcha: "",
        captchaKey: ""
      },
      phoneForm: {
        mobile: "",
        secret: "",
        type: ""
        // captcha: "",
        // captchaKey: ""
      },
      passrules: {
        mobile: [{ required: true, validator: checkPhone, trigger: "blur" }],
        secret: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      },
      phonerules: {
        mobile: [{ required: true, validator: checkPhone, trigger: "blur" }],
        secret: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
        // captcha: [
        //   {
        //     required: true,
        //     message: "验证码不能为空",
        //     trigger: "blur"
        //   }
        // ]
      }
    };
  },
  watch: {
    activeName(newVal) {
      if (newVal == "PASSWORD") {
        // getImgCode();
        this.resetPhoneForm();
        console.log(newVal);
        this.passForm.type = newVal;
      } else {
        this.resetPassForm();
        this.phoneForm.type = newVal;
      }
    },
    passForm: {
      handler(newVal) {
        console.log(newVal);
        if (
          this.passForm.mobile &&
          this.passForm.secret &&
          this.passForm.captcha
        ) {
          this.canLogin = false;
        } else {
          this.canLogin = true;
        }
      },
      deep: true
    },
    phoneForm: {
      handler(newVal) {
        console.log(newVal);
        if (this.phoneForm.mobile && this.phoneForm.secret) {
          this.canLogin = false;
        } else {
          this.canLogin = true;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getImgCodeMsg();
    // 在项目加载完成之后初始化wow
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: false
    });
    wow.init();
  },
  methods: {
    forgetPass() {
      this.dialog_flag = true;
      console.log(this.dialog_flag);
    },
    /* 获取图片验证码 */
    getImgCodeMsg() {
      getImgCode().then(res => {
        console.log(res);
        let params = res.data.data;
        // console.log(params);
        this.passForm.captchaKey = params.key;
        this.captchaImg = params.image;
        this.passForm.type = this.activeName;
      });
    },
    // 获取验证码
    getCode() {
      let phoneNum = this.phoneForm.mobile;
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
    // 密码登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let loginParams;
          if (this.activeName == "PASSWORD") {
            loginParams = JSON.parse(JSON.stringify(this.passForm));
          } else {
            loginParams = JSON.parse(JSON.stringify(this.phoneForm));
          }
          console.log(loginParams);
          // this.$router.push({ name: "ViewHomeindex" });
          this.$store
            .dispatch("app/login", loginParams)
            .then(res => {
              console.log(res);
              this.getUserMsg();
              this.$router.push({ name: "ViewHomeindex" });
              this.$message.success("登录成功");
            })
            .catch(error => {
              clearInterval(this.codeBtnStatus.codeTimer);
              this.codeBtnStatus.codemsg = "重新发送";
              this.codeBtnStatus.status = true;
              this.phoneForm.secret = "";
              console.log(error);
              // this.$message.error("登录失败");
            });
        } else {
          this.$message.error("填写必要信息");
          return false;
        }
      });
    },
    // 获取用户信息
    getUserMsg() {
      this.$store
        .dispatch("app/getUser")
        .then(res => {
          console.log(res);
          this.$message.success("获取用户信息成功");
        })
        .catch(error => {
          console.log(error);
          this.$message.error("获取用户信息失败");
        });
    },
    /* 清空密码表单 */
    resetPassForm() {
      this.$refs.passForm.resetFields();
    },
    /* 清空手机表单 */
    resetPhoneForm() {
      this.$refs.phoneForm.resetFields();
    },
    handleClick() {}
  }
};
</script>
<style lang="scss">
.allLogin {
  background: url("../../assets/images/login/loginbg.png");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 364px);
  padding: 20px 0;
  .loginBox {
    display: flex;
    align-items: center;
    justify-content: space-around;
    .imgBox {
      img {
        width: 718px;
        height: 486px;
      }
    }
    .el-tabs {
      max-height: 500px;
      padding-top: 20px;
      padding-bottom: 200px;
      .el-tabs__item {
        width: 108px;
        height: 35px;
        font-size: 24px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        // color: rgba(102, 102, 102, 1);
        line-height: 20px;
        text-align: center;
      }
      .el-tabs__active-bar {
        width: 108px !important;
        height: 3px !important;
      }
      .el-form {
        width: 574px;
        .el-form-item {
          padding: 0 20px;
          margin: 30px 0;
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
        .loginBtn {
          .el-button--success {
            background: $sencondcolor;
            border: 1px solid $sencondcolor;
            &.is-disabled {
              background: #f4f4f4;
              border: 1px solid #e0e0e0;
              color: #666666;
            }
          }
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
            color: #333;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
