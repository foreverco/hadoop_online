<template>
  <div class="CertifyBox">
    <!-- <el-alert :title="warningTitle" type="warning" show-icon :closable="false"> -->
    <!-- </el-alert> -->
    <div class="titleShow">
      <i class="el-icon-video-camera-solid"></i>
      <span class="title">温馨提示：</span>
      <span
        >只有完成实名认证，方可在交易平台发布供求信息，请根据实际情况选择您的认证方式</span
      >
    </div>
    <el-form
      :rules="cerifyRules"
      :model="cerifyForm"
      ref="cerifyForm"
      label-position="right"
      label-width="100px"
    >
      <p>请选择实名认证方式</p>
      <el-form-item label="认证方式" prop="autonymType">
        <el-radio-group v-model="cerifyForm.autonymType">
          <el-radio :label="0">个人认证</el-radio>
          <el-radio :label="1">企业认证</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户类型" prop="roleCode">
        <el-select v-model="cerifyForm.roleCode" placeholder="请选择类型">
          <el-option
            v-for="item in userTypes"
            :key="item.roleCode"
            :label="item.roleName"
            :value="item.roleCode"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <p>请按要求填写实名认证信息</p>
      <template v-if="cerifyForm.autonymType == 0">
        <el-form-item label="真实姓名" prop="privateName">
          <el-input
            v-model="cerifyForm.privateName"
            placeholder="请输入真实姓名"
            autocomplete="off"
            style="width:30%"
          ></el-input>
        </el-form-item>
        <el-form-item prop="privateIdcard" label="身份证">
          <el-input
            v-model="cerifyForm.privateIdcard"
            placeholder="请输入身份证号"
            autocomplete="off"
            style="width:30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="户籍所在地" prop="firmOrganizingCode">
          <el-cascader
            v-model="firmRegisterPlace"
            :options="firmRegisterPlaceOptions"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item prop="cardImg" label="上传身份证">
          <el-upload action="#" list-type="picture-card" :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="企业名称">
          <el-input v-model="cerifyForm.firmName" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input
            v-model="cerifyForm.firmLegalPeople"
            style="width:30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业联系电话">
          <el-input v-model="cerifyForm.firmPhone" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item label="注册资本">
          <el-select v-model="cerifyForm.firmFund" placeholder="请选择">
            <el-option
              v-for="item in firmFundList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业官网">
          <el-input v-model="cerifyForm.firmSites" style="width:50%">
            <template slot="prepend">Http://</template>
            <template slot="append">.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="firmCardType">
          <el-radio-group v-model="cerifyForm.firmCardType">
            <el-radio :label="0">三证</el-radio>
            <el-radio :label="1">三证合一</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="营业执照注册号" prop="firmBusinessLicense">
          <el-input
            v-model="cerifyForm.firmBusinessLicense"
            style="width:30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="营业执照到期日" prop="firmLicenseDueDate">
          <el-date-picker
            v-model="cerifyForm.firmLicenseDueDate"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="纳税人识别号" prop="firmTaxpayerNumber">
          <el-input
            v-model="cerifyForm.firmTaxpayerNumber"
            style="width:30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="组织机构代码" prop="firmOrganizingCode">
          <el-input
            v-model="cerifyForm.firmOrganizingCode"
            style="width:30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业注册地址" prop="firmOrganizingCode">
          <el-cascader
            v-model="firmRegisterPlace"
            :options="firmRegisterPlaceOptions"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="详细地址"
            v-model="cerifyForm.firmRegisterLocation"
            style="width:30%"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业经营范围" prop="firmBusinessScope">
          <el-input
            v-model="cerifyForm.firmBusinessScope"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            style="width:50%"
          ></el-input>
        </el-form-item>
      </template>
      <el-form-item class="btnBox">
        <el-button type="success" @click="certifySubmit('cerifyForm')"
          >提交审核</el-button
        >
        <el-button type="success" @click="certifySubmit('cerifyForm')"
          >重置表单</el-button
        >
      </el-form-item>
    </el-form>
    <DialogVue :flag.sync="dialog_flag"></DialogVue>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import DialogVue from "./dialog";
export default {
  name: "Certify",
  components: {
    DialogVue
  },
  data() {
    return {
      // 弹框状态
      dialog_flag: false,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      warningTitle:
        "温馨提示: 只有完成实名认证,方可在交易平台发布供求信息,请根据实际情况选择您的认证方式。",
      messOption: null,
      // 注册资本列表
      firmFundList: [],
      //
      firmRegisterPlace: [],
      // 测试地址
      firmRegisterPlaceOptions: [
        {
          value: "01",
          label: "江苏省",
          children: [
            {
              value: "0101",
              label: "南京市",
              children: [
                {
                  value: "010101",
                  label: "江宁区"
                }
              ]
            }
          ]
        }
      ],
      cerifyForm: {
        // 用户类型
        roleCode: "",
        // 认证类型
        autonymType: 0,
        // 姓名
        privateName: "",
        // 身份证号
        privateIdcard: "",
        // 企业名称
        firmName: "",
        // 法定代表人
        firmLegalPeople: "",
        // 企业联系电话
        firmPhone: "",
        // 注册资本
        firmFund: "",
        // 企业官网
        firmSites: "",
        // 证件类型
        firmCardType: "",
        // 营业执照注册号
        firmBusinessLicense: "",
        // 营业执照到期日
        firmLicenseDueDate: "",
        // 纳税人识别号
        firmTaxpayerNumber: "",
        // 组织机构代码
        firmOrganizingCode: "",
        // 详细地址
        firmRegisterLocation: "",
        // 企业经营范围
        firmBusinessScope: ""
      },
      cerifyRules: {
        autonymType: [
          {
            required: true,
            message: "请选择认证方式",
            trigger: "change"
          }
        ],
        roleCode: [
          {
            required: true,
            message: "请选择认证方式",
            trigger: "change"
          }
        ],
        privateName: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" }
        ],
        privateIdcard: [
          { required: true, message: "身份证号不能为空", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    userTypes() {
      return this.$store.state.user.userTypes;
    },
    fatherType() {
      return this.$store.state.config.autonymType;
    }
  },
  watch: {
    fatherType(newVal) {
      this.cerifyForm.autonymType = newVal;
    },
    cerifyForm: {
      handler(newVal) {
        this.$store.commit("config/updateautonymType", newVal.autonymType);
      },
      deep: true
    }
  },
  mounted() {
    this.getUserTypes();
    this.cerifyForm.autonymType = this.fatherType;
  },
  methods: {
    // 获取用户类型
    ...mapActions(["getUserTypes"]),
    // 提交审核
    certifySubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialog_flag = true;
          // const h = this.$createElement;
          // this.messOption = this.$message.success({
          //   duration: 0,
          //   message: h("p", { style: "margin-left:20px" }, [
          //     h(
          //       "p",
          //       { style: "margin-bottom: 5px" },
          //       "系统消息 (您的申请正在审核中,审核结果会以短信方式发送到您的手机)"
          //     ),
          //     h("p", null, [
          //       h(
          //         "span",
          //         { style: "color: red;margin-right:10px" },
          //         "温馨提示"
          //       ),
          //       h(
          //         "span",
          //         { style: "margin:0 10px;" },
          //         "完成用户调查后,可以在用户市场优先展示您的供求信息噢！"
          //       ),
          //       h("el-button", { on: { click: this.closeMess } }, "点击前往")
          //     ])
          //   ])
          // });
        } else {
          this.$message.error("请填写必要信息");
        }
      });
    },
    closeMess() {
      this.messOption ? this.messOption.close() : null;
      this.$router.push({ name: "Survey" });
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleChange() {}
  }
};
</script>
<style lang="scss">
.CertifyBox {
  // border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  .titleShow {
    background: #f4f4f4;
    width: 100%;
    height: 42px;
    line-height: 42px;
    i {
      color: #d82a2a;
      margin: 0 10px;
      font-size: 16px;
    }
    span {
      color: #666666;
      &.title {
        font-weight: 600;
        color: #d82a2a;
      }
    }
  }
  .el-form {
    // border: 1px solid blue;
    width: 100%;
    margin-top: 20px;
    p {
      color: #333;
      margin-bottom: 20px;
    }
    .el-form-item {
      margin-left: 40px;
    }
    .btnBox {
      .el-button {
        width: 171px;
        background: $maincolor;
        border-radius: 5px;
        &:last-child {
          background: $sencondcolor;
          border: 1px solid $sencondcolor;
          margin-left: 44px;
        }
      }
    }
  }
}
</style>
