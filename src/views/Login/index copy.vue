<template>
  <div class="lvcontainer loginBox">
    <el-card>
      <el-tabs
        class="wow slideInRight"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane label="密码登陆" name="PASSWORD">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-position="left"
            class="demo-ruleForm"
          >
            <el-form-item prop="phone">
              <el-input
                v-model.number="ruleForm.phone"
                placeholder="请输入手机号"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="pass">
              <el-input
                type="password"
                v-model="ruleForm.pass"
                placeholder="请输入密码"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <div class="captchaBox">
                <el-input
                  type="code"
                  v-model="ruleForm.code"
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
            <div style="display:flex;justify-content: center;margin-top:20px">
              <el-button
                style="width:95%"
                type="success"
                size="medium"
                @click="submitForm('ruleForm')"
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
        <el-tab-pane label="短信登陆" name="SMS">短信登陆</el-tab-pane>
      </el-tabs>
    </el-card>

    <DiaLogVue :flag.sync="dialog_flag"></DiaLogVue>
  </div>
</template>
<script>
import { validatePhone } from "@/util/validate";
import DiaLogVue from "./components/dialog";
import { getImgCode } from "../../api/login";
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
      activeName: "PASSWORD",
      captchaImg: "",
      ruleForm: {
        phone: "",
        pass: "",
        code: ""
      },
      ruleForm1: {
        mobile: "",
        secret: "",
        type: "",
        captchaKey: "",
        captcha: ""
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        pass: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    activeName(newVal) {
      console.log(newVal);
      if (newVal == "password") {
        // getImgCode();
      }
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
        this.ruleForm1.captchaKey = params.key;
        this.captchaImg = params.image;
        this.ruleForm1.type = this.activeName;
      });
    },
    // 登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let loginParams = {
            username: this.ruleForm.phone,
            password: this.ruleForm.pass
          };
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
              console.log(error);
              this.$message.error("登录失败");
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
    handleClick() {}
  }
};
</script>
<style lang="scss">
.loginBox {
  padding-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-tabs {
    .el-form {
      width: 600px;
      .el-form-item {
        padding: 0 20px;
        margin: 30px 0;
        // border: 1px solid red;
        // height: 80px;
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
</style>
