<template>
  <div class="perCenter">
    <FormVue
      ref="vueForm"
      class="perCenterForm"
      :formData="formData"
      :formItem="formItem"
      :formHandle="formHandle"
      :formConfig="formConfig"
    >
      <template v-slot:headUrl>
        <div class="photoBox">
          <el-upload
            class="avatar-uploader"
            action="/api/media/file/upload"
            :show-file-list="false"
            :headers="{ Authorization: tokenMsg }"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="formData.headUrl"
              :src="formData.headUrl"
              class="avatar"
              style="width:100px;height:100px;border-radius:100px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <el-avatar :size="100" fit="fill" :src="formData.headUrl"></el-avatar> -->
          <p>
            {{ userMsg.info.nickname }}
            <span>修改</span>
          </p>
        </div>
      </template>
      <template v-slot:city="slotData">
        <p v-if="false">{{ slotData }}</p>
        <CascaderVue
          :areaValue.sync="formData.city"
          ref="cascader"
          :areaConfig="{ mapLocation: false }"
          @callback="callbackComponents"
          style="width:70%"
        ></CascaderVue>
      </template>
    </FormVue>
  </div>
</template>
<script>
import CascaderVue from "@/components/Cascader";
import FormVue from "@/components/form";
import { edituserInfo } from "@/api/userInfo";
export default {
  name: "PerCenter",
  components: {
    CascaderVue,
    FormVue
  },
  data() {
    let validateNumber = (rule, value, callback) => {
      const regNumber = /^[0-9]*$/;
      if (!value) {
        callback(new Error("请输入亩数"));
      } else if (!regNumber.test(value)) {
        callback(new Error("请输入数字"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据配置
      formData: {
        headUrl: "",
        mobile: "",
        nickname: "",
        sex: "",
        city: [],
        addressDetail: "",
        address: ""
      },
      // 表单配置
      formConfig: {
        itemMargin: "28px",
        labelWidth: "70px"
      },
      formItem: [
        {
          type: "Slot",
          slotName: "headUrl",
          prop: "headUrl"
        },
        {
          type: "Input",
          label: "手机号",
          placeholder: "请输入手机号",
          prop: "mobile",
          width: "380px",
          disable: true,
          validator: [{ validator: validateNumber, trigger: "change" }]
        },
        {
          type: "Input",
          label: "用户名",
          placeholder: "请输入用户名",
          prop: "nickname",
          width: "100%",
          required: true
          // validator: [{ validator: validateNumber, trigger: "change" }]
        },
        {
          type: "Radio",
          label: "性别",
          prop: "sex",
          options: this.$store.state.config.sex_json,
          required: true,
          width: "50px"
        },
        {
          type: "Slot",
          slotName: "city",
          prop: "city",
          required: true,
          label: "地理位置"
        },
        {
          type: "Input",
          label: "详细地址",
          required: true,
          placeholder: "请输入详细地址",
          prop: "addressDetail",
          width: "100%"
        }
      ],
      formHandle: [
        {
          label: "保存",
          type: "success",
          width: "170px",
          handler: () => this.add()
        },
        {
          label: "取消",
          type: "success",
          width: "170px",
          handler: () => this.del()
        }
      ],

      // perForm: {
      //   nickname: "",
      //   sex: 1,
      //   area: [],
      //   addressDetail: "",
      //   headUrl: require("@/assets/images/nav/navlogo.png")
      // },
      area: []
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
      // console.log(typeof this.$store.state.app.userInfo);
      if (typeof this.$store.state.app.userInfo === "string") {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    }
  },
  watch: {
    userMsg: {
      handler(newVal) {
        // console.log(newVal);
        // this.formData.mobile = newVal.info.username;
        // this.formData.nickname = newVal.info.nickname;
        // this.formData.sex = newVal.info.sex;
        // this.formData.sex = newVal.info.sex;
        this.formData = newVal.info;
        this.formData.mobile = newVal.info.username;
        this.formData.city = [];
        this.formData.city[0] = newVal.info.addressProvince;
        this.formData.city[1] = newVal.info.addressCity;
        this.formData.city[2] = newVal.info.addressArea;
      },
      immediate: true
    }
  },
  // created() {
  //   this.getUserMsg();
  // },
  mounted() {
    console.log(this.userMsg);
    this.getAdressCh(this.userMsg.info.address);
  },
  methods: {
    // 提交用户修改
    add() {
      // console.log(this.formData);
      let userFormParams = JSON.parse(JSON.stringify(this.formData));
      userFormParams.addressProvince = this.formData.city[0];
      userFormParams.addressCity = this.formData.city[1];
      userFormParams.addressArea = this.formData.city[2];
      this.$refs.vueForm.$refs.form.validate(valid => {
        if (valid) {
          edituserInfo(userFormParams).then(res => {
            console.log(res);
            this.$message.success(res.data.msg);
            this.getUserMsg();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    del() {
      alert(444);
    },
    // 获取用户信息
    getUserMsg() {
      this.$store
        .dispatch("app/getUser")
        .then(res => {
          console.log(res);
          // this.$message.success("获取用户信息成功");
        })
        .catch(error => {
          console.log(error);
          // this.$message.error("获取用户信息失败");
        });
    },
    callbackComponents(params) {
      if (params.function) {
        this[params.function](params.data.adress);
      }
    },
    adressShow(data) {
      this.formData.address = data;
      console.log(this.formData.address);
    },
    getAdressCh(e) {
      this.$refs.cascader.initPlaceHodler(e);
    },
    handleAvatarSuccess(res, file) {
      console.log("上传成功！");
      console.log(res);
      console.log(file);
      this.formData.headUrl = res.data;
      this.add();
    },
    beforeAvatarUpload(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss">
.perCenter {
  .perCenterForm {
    .el-button {
      border: 1px solid red;
      width: 170px !important;
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
</style>
<style lang="scss" scoped>
.perCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .el-form {
    .photoBox {
      width: 100%;
      text-align: center;
      margin-left: -35px;
      p {
        position: relative;
        &:hover {
          span {
            opacity: 1;
          }
        }
        span {
          color: $redColor;
          opacity: 0;
          margin-left: 10px;
          position: absolute;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .el-form-item {
      &.userBox {
        .el-button {
          background: transparent;
          border: 0;
          color: $redColor;
          span {
            font-size: 16px;
          }
          i {
            font-size: 16px;
          }
        }
      }
      &.btnBox {
        margin-top: 20px;
      }
    }
  }
}
</style>
