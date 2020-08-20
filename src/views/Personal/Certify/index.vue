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
      v-if="showForm"
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
        <el-form-item label="种植所在地" prop="firmOrganizingCode">
          <CascaderVue
            :areaValue.sync="cerifyForm.city"
            ref="cascader"
            :areaConfig="{ mapLocation: false }"
            @callback="callbackComponents"
            style="width:70%"
          ></CascaderVue>
        </el-form-item>
        <el-form-item prop="cardImg" label="上传身份证">
          <el-row>
            <el-col :span="10">
              <per-upload
                class="avatar-uploader"
                :limit="1"
                action="/media/file/upload"
                :show-file-list="false"
                cropper
                :cropperOption="{
                  autoCropWidth: 200,
                  autoCropHeight: 120,
                  fixedBox: true,
                  fixedNumber: [2, 1]
                }"
                :on-success="FrontPicMethod"
                :before-upload="beforeAvatarUpload"
                style="{border:1px solid blue}"
              >
                <img
                  v-if="cerifyForm.privateIdcardFront"
                  :src="cerifyForm.privateIdcardFront"
                  class="avatar"
                  width="200"
                  height=""
                />
                <img
                  v-else
                  src="@/assets/images/common/身份证正面照.png"
                  class="avatar"
                  width="200"
                />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </per-upload>
            </el-col>
            <el-col :span="10">
              <per-upload
                class="avatar-uploader"
                :limit="1"
                action="/media/file/upload"
                :show-file-list="false"
                cropper
                :on-success="BackPicMethod"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="cerifyForm.privateIdcardBack"
                  :src="cerifyForm.privateIdcardBack"
                  class="avatar"
                  width="200"
                />
                <img
                  v-else
                  src="@/assets/images/common/back.png"
                  class="avatar"
                  width="200"
                />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </per-upload>
            </el-col>
          </el-row>
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
            <template slot="prepend">Http://www</template>
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
          <CascaderVue
            :areaValue.sync="cerifyForm.qycity"
            ref="cascader"
            :areaConfig="{ mapLocation: false }"
            @callback="callbackComponents"
            style="width:70%"
          ></CascaderVue>
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
        <el-form-item label="企业资质上传">
          <p>
            请留意照片上的文字须清晰可见，照片支持jpg、gif、bmp、png格式，每张图片不超过10MB
          </p>
          <el-row>
            <el-col :span="10">
              <per-upload
                class="avatar-uploader"
                :limit="1"
                action="/media/file/upload"
                :show-file-list="false"
                cropper
                :cropperOption="{
                  autoCropWidth: 200,
                  autoCropHeight: 120,
                  fixedBox: true,
                  fixedNumber: [2, 1]
                }"
                :on-success="LicensePicMethod"
                :before-upload="beforeAvatarUpload"
                style="{border:1px solid blue}"
              >
                <img
                  v-if="cerifyForm.firmBusinessLicenseImage"
                  :src="cerifyForm.firmBusinessLicenseImage"
                  class="avatar"
                  width="200"
                  height=""
                />
                <img
                  v-else
                  src="@/assets/images/common/身份证正面照.png"
                  class="avatar"
                  width="200"
                />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </per-upload>
              <p style="text-align:center;width:200px;">营业执照</p>
            </el-col>
            <el-col :span="10">
              <per-upload
                class="avatar-uploader"
                :limit="1"
                action="/media/file/upload"
                :show-file-list="false"
                cropper
                :cropperOption="{
                  autoCropWidth: 200,
                  autoCropHeight: 120,
                  fixedBox: true,
                  fixedNumber: [2, 1]
                }"
                :on-success="rationMethod"
                :before-upload="beforeAvatarUpload"
                style="{border:1px solid blue}"
              >
                <img
                  v-if="cerifyForm.firmTaxRegistrationImage"
                  :src="cerifyForm.firmTaxRegistrationImage"
                  class="avatar"
                  width="200"
                  height=""
                />
                <img
                  v-else
                  src="@/assets/images/common/身份证正面照.png"
                  class="avatar"
                  width="200"
                />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </per-upload>
              <p style="text-align:center;width:200px;">税务登记证</p>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <per-upload
                class="avatar-uploader"
                :limit="1"
                action="/media/file/upload"
                :show-file-list="false"
                cropper
                :cropperOption="{
                  autoCropWidth: 200,
                  autoCropHeight: 120,
                  fixedBox: true,
                  fixedNumber: [2, 1]
                }"
                :on-success="firmOrganizingCodeImageMethod"
                :before-upload="beforeAvatarUpload"
                style="{border:1px solid blue}"
              >
                <img
                  v-if="cerifyForm.firmOrganizingCodeImage"
                  :src="cerifyForm.firmOrganizingCodeImage"
                  class="avatar"
                  width="200"
                  height=""
                />
                <img
                  v-else
                  src="@/assets/images/common/身份证正面照.png"
                  class="avatar"
                  width="200"
                />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </per-upload>
              <p style="text-align:center;width:200px;">组织机构代码证</p>
            </el-col>
            <el-col :span="10">
              <per-upload
                class="avatar-uploader"
                :limit="1"
                action="/media/file/upload"
                :show-file-list="false"
                cropper
                :cropperOption="{
                  autoCropWidth: 200,
                  autoCropHeight: 120,
                  fixedBox: true,
                  fixedNumber: [2, 1]
                }"
                :on-success="firmAccountImageMethod"
                :before-upload="beforeAvatarUpload"
                style="{border:1px solid blue}"
              >
                <img
                  v-if="cerifyForm.firmAccountImage"
                  :src="cerifyForm.firmAccountImage"
                  class="avatar"
                  width="200"
                  height=""
                />
                <img
                  v-else
                  src="@/assets/images/common/身份证正面照.png"
                  class="avatar"
                  width="200"
                />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </per-upload>
              <p style="text-align:center;width:200px;">银行开户许可证</p>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10">
              <per-upload
                class="avatar-uploader"
                :limit="1"
                action="/media/file/upload"
                :show-file-list="false"
                cropper
                :cropperOption="{
                  autoCropWidth: 200,
                  autoCropHeight: 120,
                  fixedBox: true,
                  fixedNumber: [2, 1]
                }"
                :on-success="firmOtherResource1Method"
                :before-upload="beforeAvatarUpload"
                style="{border:1px solid blue}"
              >
                <img
                  v-if="cerifyForm.firmOtherResource1"
                  :src="cerifyForm.firmOtherResource1"
                  class="avatar"
                  width="200"
                  height=""
                />
                <img
                  v-else
                  src="@/assets/images/common/身份证正面照.png"
                  class="avatar"
                  width="200"
                />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </per-upload>
              <p style="text-align:center;width:200px;">其他资质1</p>
            </el-col>
            <el-col :span="10">
              <per-upload
                class="avatar-uploader"
                :limit="1"
                action="/media/file/upload"
                :show-file-list="false"
                cropper
                :cropperOption="{
                  autoCropWidth: 200,
                  autoCropHeight: 120,
                  fixedBox: true,
                  fixedNumber: [2, 1]
                }"
                :on-success="firmOtherResource2Method"
                :before-upload="beforeAvatarUpload"
                style="{border:1px solid blue}"
              >
                <img
                  v-if="cerifyForm.firmOtherResource2"
                  :src="cerifyForm.firmOtherResource2"
                  class="avatar"
                  width="200"
                  height=""
                />
                <img
                  v-else
                  src="@/assets/images/common/身份证正面照.png"
                  class="avatar"
                  width="200"
                />
                <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
              </per-upload>
              <p style="text-align:center;width:200px;">其他资质2</p>
            </el-col>
          </el-row>
        </el-form-item>
      </template>
      <el-form-item class="btnBox">
        <el-button type="success" @click="certifySubmit('cerifyForm')"
          >提交审核</el-button
        >
        <el-button type="success" @click="resetcertify('cerifyForm')"
          >重置表单</el-button
        >
      </el-form-item>
    </el-form>
    <div v-else class="hidebox">
      <StautsBox
        :firmRegisterMsg="firmRegisterMsg"
        :showForm.sync="showForm"
      ></StautsBox>
    </div>
    <DialogVue :flag.sync="dialog_flag"></DialogVue>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import DialogVue from "./dialog";
import CascaderVue from "@/components/Cascader";
import { checkauthentic, editauthentic } from "@/api/userInfo";
import StautsBox from "./components/statusBox";
export default {
  name: "Certify",
  components: {
    DialogVue,
    CascaderVue,
    StautsBox
  },
  data() {
    return {
      // 是否已实名认证
      showForm: true,
      // 实名认证信息
      firmRegisterMsg: {},
      // 弹框状态
      dialog_flag: false,
      // dialogImageUrl: "",
      // dialogVisible: false,
      disabled: false,
      warningTitle:
        "温馨提示: 只有完成实名认证,方可在交易平台发布供求信息,请根据实际情况选择您的认证方式。",
      messOption: null,
      // 注册资本列表
      firmFundList: [
        { label: "100万以下", value: "100万以下" },
        { label: "100-1000万", value: "100-1000万" },
        { label: "1000-5000万", value: "1000-5000万" },
        { label: "5000万以上", value: "5000万以上" }
      ],
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
        city: [],
        qycity: [],
        // 用户类型
        roleCode: "",
        // 认证类型
        autonymType: 0,
        // 姓名
        privateName: "",
        // 身份证号
        privateIdcard: "",
        // 个人身份证正面照片url
        privateIdcardFront: "",
        //个人身份证背面照片url
        privateIdcardBack: "",
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
        // 企业认证详细地址
        firmRegisterLocation: "",
        // 个人认证详细地址
        privateArea: "",
        // 企业经营范围
        firmBusinessScope: "",
        // 营业执照url
        firmBusinessLicenseImage: "",
        // 企业税务登记证图片url
        firmTaxRegistrationImage: "",
        // 组织机构代码证图片url
        firmOrganizingCodeImage: "",
        // 银行开户许可证url
        firmAccountImage: "",
        // 其他资源url1
        firmOtherResource1: "",
        // 其他资源url2
        firmOtherResource2: ""
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
    userMsg() {
      if (
        typeof this.$store.state.app.userInfo == "string" &&
        this.$store.state.app.userInfo != "undefined"
      ) {
        return JSON.parse(this.$store.state.app.userInfo);
      } else {
        return this.$store.state.app.userInfo;
      }
    },
    userTypes() {
      // console.log(this.$store.state.user.userTypes);
      // return this.$store.state.user.userTypes;
      if (this.fatherType == 0) {
        return this.$store.state.user.userTypes.filter(item => {
          return item.roleCode == "client_plant";
        });
      } else {
        return this.$store.state.user.userTypes;
      }
    },
    fatherType() {
      return this.$store.state.config.autonymType;
    }
  },
  watch: {
    fatherType: {
      handler(newVal) {
        this.cerifyForm.autonymType = newVal;
        // console.log(this.cerifyForm.autonymType);
      },
      immediate: true
    },
    cerifyForm: {
      handler(newVal) {
        this.$store.commit("updateautonymType", newVal.autonymType);
        // console.log(this.userTypes);
      },
      deep: true
    },
    "cerifyForm.autonymType": {
      handler: function() {
        let isroleCode = this.userTypes.filter(item => {
          return item.roleCode == this.mainRoleCode;
        });
        // console.log(isroleCode);
        // console.log(this.mainRoleCode);
        if (isroleCode.length === 0) {
          this.cerifyForm.roleCode = "";
        } else {
          this.cerifyForm.roleCode = this.mainRoleCode;
        }
      }
    }
  },
  created() {
    this.checkStatus();
    console.log(this.userMsg);
  },
  mounted() {
    this.getUserTypes();
    this.cerifyForm.autonymType = this.fatherType;
  },
  methods: {
    // 获取用户类型
    ...mapActions(["getUserTypes"]),
    // 检查审核状态
    checkStatus() {
      // console.log("checkStatus");
      checkauthentic()
        .then(res => {
          // console.log("res");
          console.log(res);
          if (res.data.data.roleCode == "client_plant") {
            this.cerifyForm.autonymType = 0;
          } else {
            this.cerifyForm.autonymType = 1;
          }
          if (res.data.data.autonym == 0) {
            this.cerifyForm.roleCode = res.data.data.roleCode;
            this.mainRoleCode = res.data.data.roleCode;
          }
          console.log(res.data.data.auditResult);
          if (!res.data.data.auditResult) {
            this.showForm = true;
          } else {
            this.showForm = false;
            this.firmRegisterMsg = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交审核
    certifySubmit(formName) {
      console.log(this.cerifyForm);
      console.log(this.cerifyForm.autonymType);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.dialog_flag = true;
          let formParams = JSON.parse(JSON.stringify(this.cerifyForm));
          if (this.cerifyForm.autonymType == 0) {
            formParams.nativeProvince = this.cerifyForm.city[0];
            formParams.nativeCity = this.cerifyForm.city[1];
            formParams.nativeArea = this.cerifyForm.city[2];
          } else if (this.cerifyForm.autonymType == 1) {
            formParams.nativeProvince = this.cerifyForm.qycity[0];
            formParams.nativeCity = this.cerifyForm.qycity[1];
            formParams.nativeArea = this.cerifyForm.qycity[2];
          }
          console.log(formParams);
          editauthentic(formParams).then(res => {
            console.log(res);
          });
        } else {
          this.$message.error("请填写必要信息");
        }
      });
    },
    resetcertify() {},
    closeMess() {
      this.messOption ? this.messOption.close() : null;
      this.$router.push({ name: "Survey" });
    },
    // handleRemove(file) {
    //   console.log(file);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    // handleDownload(file) {
    //   console.log(file);
    // },
    handleChange() {},
    callbackComponents(params) {
      if (params.function) {
        this[params.function](params.data.adress);
      }
    },
    adressShow(data) {
      this.cerifyForm.address = data;
      console.log(this.cerifyForm.address);
    },
    // 正面身份证
    FrontPicMethod(res) {
      console.log(res);
      if (res.code == 200) {
        console.log(res);
        this.cerifyForm.privateIdcardFront = res.data;
      } else {
        console.log("图片上传失败");
      }
    },
    // 背面身份证
    BackPicMethod(res) {
      console.log(res);
      if (res.code == 200) {
        console.log(res);
        this.cerifyForm.privateIdcardBack = res.data;
      } else {
        console.log("图片上传失败");
      }
    },
    // 营业执照
    LicensePicMethod(res) {
      console.log(res);
      if (res.code == 200) {
        console.log(res);
        this.cerifyForm.firmBusinessLicenseImage = res.data;
      } else {
        console.log("图片上传失败");
      }
    },
    // 税务登记url
    rationMethod(res) {
      if (res.code == 200) {
        console.log(res);
        this.cerifyForm.firmTaxRegistrationImage = res.data;
      } else {
        console.log("图片上传失败");
      }
    },
    // 组织机构代码证
    firmOrganizingCodeImageMethod(res) {
      if (res.code == 200) {
        console.log(res);
        this.cerifyForm.firmOrganizingCodeImage = res.data;
      } else {
        console.log("图片上传失败");
      }
    },
    // 银行开户许可证
    firmAccountImageMethod(res) {
      if (res.code == 200) {
        console.log(res);
        this.cerifyForm.firmAccountImage = res.data;
      } else {
        console.log("图片上传失败");
      }
    },
    firmOtherResource1Method(res) {
      if (res.code == 200) {
        console.log(res);
        this.cerifyForm.firmOtherResource1 = res.data;
      } else {
        console.log("图片上传失败");
      }
    },
    firmOtherResource2Method(res) {
      if (res.code == 200) {
        console.log(res);
        this.cerifyForm.firmOtherResource2 = res.data;
      } else {
        console.log("图片上传失败");
      }
    },
    beforeAvatarUpload(e) {
      console.log(e);
    }
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
  .hidebox {
    width: 100%;
  }
}
</style>
