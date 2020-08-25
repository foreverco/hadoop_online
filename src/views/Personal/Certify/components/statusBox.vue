<template>
  <div class="statusBox">
    <el-steps :active="statusNow" align-center :space="1200">
      <el-step title="提交审核" description="2020-08-12 13:00:00"></el-step>
      <el-step title="审核中" description="2020-08-12 13:00:00"></el-step>
      <el-step
        :icon="statusNow == 5 ? 'el-icon-error' : 'el-icon-success'"
        :title="statusNow == 5 ? '审核失败' : '审核成功'"
        :description="initfirmRegisterData.reason"
      ></el-step>
    </el-steps>
    <div class="statusMsg">
      <p>认证信息</p>
      <ul>
        <li v-for="(item, index) in statusMsg" :key="index">
          <span>{{ item.title }}</span>
          <span>{{ item.con }}</span>
        </li>
        <li v-if="initfirmRegisterData.autonymType == 0">
          <span>身份证照片</span>
          <p>
            <img
              v-for="(item, index) in imgList"
              :key="index"
              :src="item"
              width="200"
              height="120"
              alt=""
            />
          </p>
        </li>
      </ul>
      <div class="btnBox">
        <el-button type="success">返回首页</el-button>
        <el-button
          type="success"
          :disabled="statusNow === 2"
          @click="changefirmRegister"
          >更改认证</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "StautsBox",
  props: {
    firmRegisterMsg: {
      type: Object,
      default: () => {}
    },
    showForm: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      editStatus: true,
      initfirmRegisterData: {},
      statusObj: {
        UNDERWAY: 2,
        PASS: 3,
        REJECT: 5
      },
      statusNow: 1,
      imgList: [],
      statusMsg: [
        {
          title: "企业名称",
          con: "内蒙古省中药材企业"
        },
        {
          title: "法人代表",
          con: "张三"
        },
        {
          title: "企业联系电话",
          con: "15151515151"
        },
        {
          title: "注册资本",
          con: "注册资本****万"
        },
        {
          title: "企业官网",
          con: "https://modao.cc/app/50f43ticky#screen=skcn5bz25cp9fvk"
        },
        {
          title: "营业执照注册号",
          con: "5151512165615151"
        },
        {
          title: "营业执照到期日",
          con: "2025-10-5"
        },
        {
          title: "纳税人识别号",
          con: "120*******54"
        },
        {
          title: "组织机构代码",
          con: "1fg*******13"
        },
        {
          title: "企业注册地址",
          con: "内蒙古自治区乌兰察布市化德县182-185号"
        },
        {
          title: "企业经营范围",
          con: "中药材加工、销售等"
        },
        {
          title: "企业资质上传",
          con: "已做隐私处理，不显示具体内容"
        }
      ]
    };
  },
  created() {
    this.initfirmRegisterMsg();
  },
  watch: {
    firmRegisterMsg: {
      handler() {
        this.initfirmRegisterMsg();
      }
    }
  },
  methods: {
    // 初始化认证信息
    initfirmRegisterMsg() {
      console.log(123);
      this.initfirmRegisterData = JSON.parse(
        JSON.stringify(this.firmRegisterMsg)
      );
      console.log(this.firmRegisterMsg);
      this.statusNow = this.statusObj[this.firmRegisterMsg.auditResult];
      let arr = [];
      if (this.initfirmRegisterData.autonymType == 0) {
        for (let key in this.initfirmRegisterData) {
          // console.log(key, this.initfirmRegisterData[key]);
          let obj = {};
          if (key == "privateName") {
            obj.title = "姓名";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "privateIdcard") {
            obj.title = "身份证号";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "address") {
            obj.title = "种植地址";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "privateIdcardFront") {
            // obj.title = "身份证照片";
            this.imgList.push(this.initfirmRegisterData[key]);
          } else if (key == "privateIdcardBack") {
            this.imgList.push(this.initfirmRegisterData[key]);
          }
        }
      } else {
        for (let key in this.initfirmRegisterData) {
          // console.log(key, this.initfirmRegisterData[key]);
          let obj = {};
          if (key == "firmName") {
            obj.title = "企业名称";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmLegalPeople") {
            obj.title = "企业法人";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmPhone") {
            obj.title = "企业联系电话";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmFund") {
            obj.title = "企业注册资金";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmSites") {
            obj.title = "企业官网";
            obj.con = `http://www.${this.initfirmRegisterData[key]}.com`;
            arr.push(obj);
          } else if (key == "firmBusinessLicense") {
            obj.title = "营业执照注册号";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmLicenseDueDate") {
            obj.title = "营业执照到期日";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmTaxpayerNumber") {
            obj.title = "纳税人识别号";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmOrganizingCode") {
            obj.title = "组织机构代码";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmRegisterLocation") {
            obj.title = "企业注册地址";
            obj.con = this.initfirmRegisterData["address"];
            // obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmBusinessScope") {
            obj.title = "企业经营范围";
            obj.con = this.initfirmRegisterData[key];
            arr.push(obj);
          } else if (key == "firmBusinessLicenseImage") {
            obj.title = "企业资质上传";
            obj.con = "已做隐私处理，不显示具体内容";
            arr.push(obj);
          }
        }
      }
      this.statusMsg = arr;
    },
    changefirmRegister() {
      this.$emit("update:showForm", true);
    }
  }
};
</script>
<style lang="scss" scoped>
.statusBox {
  width: 100%;
  margin-top: 30px;
  .statusMsg {
    margin-top: 30px;
    // border: 1px solid red;
    margin-left: 40px;
    p {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 600;
      margin-bottom: 20px;
    }
    ul {
      li {
        min-height: 60px;
        span {
          display: inline-block;
          // border: 1px solid red;
          color: #666666;
          &:first-child {
            width: 130px;
            margin-right: 30px;
            text-align: right;
          }
        }
        &:last-child {
          display: flex;
        }
        p {
          display: inline-block;
          img {
            margin-right: 20px;
          }
        }
      }
    }
    .btnBox {
      margin-left: 160px;
      display: flex;
      // width: 60%;
      .el-button {
        width: 171px;
        height: 34px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        &:first-child {
          margin-right: 40px;
        }
        &.is-disabled {
          background: #bfbfbf;
          border: 1px solid #bfbfbf;
        }
      }
    }
  }
}
</style>
