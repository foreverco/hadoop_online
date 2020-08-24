<template>
  <div class="ChangePhone">
    <p class="ChangePhoneTitle">修改密码</p>
    <el-form
      :rules="formRules"
      :model="formData"
      ref="phoneForm"
      label-width="100px"
    >
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="formData.newPassword" style="width:50%"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checknewPassword">
        <el-input
          v-model="formData.checknewPassword"
          style="width:50%"
        ></el-input>
      </el-form-item>
      <el-form-item label="输入验证码" prop="smsCode">
        <el-input v-model="formData.smsCode" style="width:30%"></el-input>
        <el-button
          class="codeBtn"
          size="small"
          type="success"
          :disabled="codeStatus.sendfalse"
          @click="sendCode"
        >
          {{ codeStatus.codeTxt }}
        </el-button>
      </el-form-item>
      <el-form-item>
        <div class="btnBox">
          <el-button @click="changePhone('phoneForm')">确定</el-button>
          <el-button>取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getCode } from "@/api/login";
import { reqchangePass } from "@/api/userInfo";
export default {
  name: "ChangePass",
  computed: {
    userMsg() {
      // console.log(this.$store.state.app.userInfo);
      if (
        typeof this.$store.state.app.userInfo == "string" &&
        this.$store.state.app.userInfo != "undefined"
      ) {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        if (newVal.newPassword && newVal.checknewPassword) {
          this.codeStatus.sendfalse = false;
        } else {
          this.codeStatus.sendfalse = true;
        }
      },
      deep: true
    }
    // "formData"(newVal) {
    //   if (newPassword) {
    //     this.codeStatus.sendfalse = false;
    //   } else {
    //     this.codeStatus.sendfalse = true;
    //   }
    // }
  },
  data() {
    let checkpassRule = (rule, value, callback) => {
      if (!value) {
        callback(new Error("确认密码不能为空"));
      } else if (this.formData.checknewPassword != this.formData.newPassword) {
        callback(new Error("两次密码保证一致"));
      } else {
        callback();
      }
    };
    return {
      codeStatus: {
        sendfalse: true,
        codeTxt: "获取短信验证码",
        codeTimer: null
      },
      formData: {
        newPassword: "",
        checknewPassword: "",
        smsCode: ""
      },
      formRules: {
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" }
        ],
        checknewPassword: [{ validator: checkpassRule, trigger: "blur" }],
        smsCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 发送验证码
    sendCode() {
      this.codeStatus.sendfalse = true;
      // this.codeStatus.codeTxt =
      this.lowTime();
      let codeParams = {};
      // console.log(this.userMsg.info.username);
      codeParams.mobile = this.userMsg.info.username;
      getCode(codeParams)
        .then(res => {
          console.log(res);
          this.codeStatus.codeTxt = "重新发送";
          this.codeStatus.sendfalse = false;
          clearInterval(this.codeStatus.codeTimer);
        })
        .catch(error => {
          console.log(error);
          this.codeStatus.codeTxt = "重新发送";
          this.codeStatus.sendfalse = false;
          clearInterval(this.codeStatus.codeTimer);
        });
    },
    // 倒计时
    lowTime() {
      let time = 5;
      this.codeStatus.codeTimer = setInterval(() => {
        if (time > 0) {
          this.codeStatus.codeTxt = `倒计时${time--}s`;
        }
      }, 1000);
    },
    // 修改密码
    changePhone(formName) {
      this.$refs[formName].validate(valid => {
        console.log(valid);
        if (valid) {
          this.confirm({
            tip: "确认修改密码",
            content: "确认修改为此密码",
            status: "密码修改成功",
            fn: this.changePhoneFn
          });
        } else {
          // alert(123);
          return false;
        }
      });
    },
    // 确认修改密码
    changePhoneFn() {
      let phoneParams = {};
      phoneParams.newPassword = this.formData.newPassword;
      phoneParams.smsCode = this.formData.smsCode;
      reqchangePass(phoneParams)
        .then(res => {
          console.log(res);
          // this.logout();
        })
        .catch(error => {
          console.log(error);
        });
    }
    // 退出
    // logout() {
    //   let logoutParams = { token: this.tokenMsg };
    //   this.$store
    //     .dispatch("app/clearUserInfo", logoutParams)
    //     .then(res => {
    //       console.log(res);
    //       // this.$message.success(res.data.msg);
    //       // this.logOutMsg = res.data.msg;
    //       // console.log(this.logOutMsg);
    //       this.$router.push({ name: "Login" });
    //     })
    //     .catch(error => {
    //       this.$message.success(error.data.msg);
    //     });
    // }
  }
};
</script>
<style lang="scss">
.ChangePhone {
  .el-input {
    border-radius: 5px;
  }
  .el-input__inner {
    border: 1px solid rgba(241, 241, 241, 1);
    // outline: 1px solid rgba(241, 241, 241, 1);
    background: rgba(241, 241, 241, 1);
    border-radius: 5px;
  }
}
</style>
<style lang="scss" scoped>
.ChangePhone {
  .ChangePhoneTitle {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 30px;
    margin-bottom: 30px;
  }
  .el-form {
    .el-form-item {
      margin-bottom: 30px;
      flex-wrap: nowrap;
      .codeBtn {
        margin-left: 30px;
        &.is-disabled {
          color: #666666;

          border: 1px solid rgba(241, 241, 241, 1);
          background: rgba(241, 241, 241, 1);
        }
      }
      .btnBox {
        width: 50%;
        display: flex;
        justify-content: space-between;
        .el-button {
          width: 171px;
          height: 34px;
          background: $maincolor;
          border: 1px solid $maincolor;
          border-radius: 6px;
          color: #fff;
          line-height: 0px;
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
