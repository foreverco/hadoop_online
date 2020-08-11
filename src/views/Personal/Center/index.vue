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
      <template v-slot:photo>
        <div class="photoBox">
          <el-avatar :size="100" fit="fill" :src="perForm.photo"></el-avatar>
          <p>
            {{ userMsg.info.username }}
            <span>修改</span>
          </p>
        </div>
      </template>
      <template v-slot:city="slotData">
        <p v-if="false">{{ slotData }}</p>
        <CascaderVue
          :areaValue.sync="area"
          ref="cascader"
          :areaConfig="{ mapLocation: false }"
          style="width:70%"
        ></CascaderVue>
      </template>
    </FormVue>
  </div>
</template>
<script>
import CascaderVue from "@/components/Cascader";
import FormVue from "@/components/form";
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
        photo: "",
        phone: "",
        userName: "",
        sex: "",
        city: "",
        adress: ""
      },
      // 表单配置
      formConfig: {
        itemMargin: "28px",
        labelWidth: "70px"
      },
      formItem: [
        {
          type: "Slot",
          slotName: "photo",
          prop: "photo"
        },
        {
          type: "Input",
          label: "手机号",
          placeholder: "请输入手机号",
          prop: "phone",
          width: "380px",
          disable: true,
          validator: [{ validator: validateNumber, trigger: "change" }]
        },
        {
          type: "Input",
          label: "用户名",
          placeholder: "请输入用户名",
          prop: "userName",
          width: "100%",
          validator: [{ validator: validateNumber, trigger: "change" }]
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
          prop: "adress",
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

      perForm: {
        userName: "",
        sex: 1,
        area: [],
        adress: "",
        photo: require("../../../assets/images/nav/navlogo.png")
      },
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
      console.log(typeof this.$store.state.app.userInfo);
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
        console.log(newVal);
        this.formData.phone = newVal.info.username;
      },
      immediate: true
    }
  },
  methods: {
    add() {
      console.log(this.formData);
      this.$refs.vueForm.$refs.form.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    del() {
      alert(444);
    }
  }
};
</script>
<style lang="scss">
.perCenter {
  .perCenterForm {
    .el-button {
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
        margin-top: 70px;
      }
    }
  }
}
</style>
