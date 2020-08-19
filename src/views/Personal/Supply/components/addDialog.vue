<template>
  <div class="supplyDialog">
    <el-dialog
      @close="close"
      :visible.sync="dialog_flag"
      title="系统消息"
      @opened="openDialog"
    >
      <el-form label-width="80px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="药材品名:" style="width:100%;">
              <p>{{ dialogData.medinceName }}</p>
              <!-- <el-input
                v-model="dialogData.medinceName"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="规格:" style="width:100%;">
              <p>{{ dialogData.specificationName }}</p>
              <!-- <el-input
                v-model="dialogData.specificationName"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="供应量:" style="width:100%;">
              <p v-if="dialogIsFind">
                {{ `${dialogData.supplyAmount}${dialogData.supplyUnitName}` }}
              </p>
              <el-input
                v-else
                v-model="formData.supplyAmount"
                style="width:210px;"
              >
                <el-select
                  v-model="formData.supplyUnit"
                  slot="append"
                  placeholder="请选择"
                  style="width:58px"
                >
                  <el-option
                    v-for="(item, index) in formTypeList['重量单位']"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item label="起售量:" style="width:100%;">
              <p v-if="dialogIsFind">
                {{
                  `${dialogData.startSaleAmount}${dialogData.startSaleUnitName}`
                }}
              </p>
              <el-input
                v-else
                v-model="formData.startSaleAmount"
                style="width:210px;"
              >
                <el-select
                  v-model="formData.startSaleUnit"
                  slot="append"
                  placeholder="请选择"
                  style="width:58px"
                >
                  <el-option
                    v-for="(item, index) in formTypeList['重量单位']"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>

            <el-form-item
              label="售价:"
              style="width:100%;"
              v-if="dialogData.disclosePriceName === '具体价格'"
            >
              <p v-if="dialogIsFind">
                {{ `${dialogData.price}${dialogData.priceUnitName}` }}
              </p>
              <el-input v-else v-model="formData.price" style="width:210px;">
                <el-select
                  v-model="formData.priceUnit"
                  slot="append"
                  placeholder="请选择"
                  style="width:58px"
                >
                  <el-option
                    v-for="(item, index) in formTypeList['重量单位']"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-input>
            </el-form-item>
            <el-form-item label="可供票据:" style="width:100%;">
              <p>{{ dialogData.invoiceName }}</p>
              <!-- <el-input
                v-model="dialogData.invoiceName"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="药材产地:" style="width:100%;">
              <p>
                {{
                  `${dialogData.orginProvinceName}${dialogData.orginCityName}${dialogData.orginCountyName}`
                }}
              </p>
              <!-- <el-input
                :placeholder="
                  `${dialogData.orginProvinceName}${dialogData.orginCityName}${dialogData.orginCountyName}`
                "
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="药材仓储:" style="width:100%;">
              <p>
                {{
                  `${dialogData.warehouseProvinceName}${dialogData.warehouseCityName}${dialogData.warehouseCountyName}`
                }}
              </p>
              <!-- <el-input
                :placeholder="
                  `${dialogData.warehouseProvinceName}${dialogData.warehouseCityName}${dialogData.warehouseCountyName}`
                "
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="质量标准:" style="width:100%;">
              <p>
                {{ dialogData.qualityStandardName }}
              </p>
              <!-- <el-input
                v-model="dialogData.qualityStandardName"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="资质标准:" style="width:100%;">
              <p>
                {{ dialogData.qualificationStandardName }}
              </p>
              <!-- <el-input
                v-model="dialogData.qualificationStandardName"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="有无样品:" style="width:100%;">
              <p>
                {{ dialogData.isSampleName }}
              </p>
              <!-- <el-input
                v-model="dialogData.isSampleName"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="付款方式:" style="width:100%;">
              <p>
                {{ dialogData.paymentMethodName }}
              </p>
              <!-- <el-input
                v-model="dialogData.paymentMethodName"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="联系人:" style="width:100%;">
              <p>
                {{ dialogData.contactPerson }}
              </p>
              <!-- <el-input
                v-model="dialogData.contactPerson"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="联系人电话:" style="width:100%;">
              <p>
                {{ dialogData.contactNumber }}
              </p>
              <!-- <el-input
                v-model="dialogData.contactNumber"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="提交时间:" style="width:100%;">
              <p>
                {{ dialogData.createDate }}
              </p>
              <!-- <el-input
                v-model="dialogData.createDate"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item style="width:100%;">
              <img
                :src="dialogData.medicincePic"
                style="width:336px;margin-left:-80px"
                alt=""
              />
            </el-form-item>
            <el-form-item label="状态:" style="width:100%;">
              <p
                style="font-weight:600"
                :style="{
                  color: dialogData.statusName === '供应中' ? '#3ab54c' : 'red'
                }"
              >
                {{ dialogData.statusName }}
              </p>
              <!-- <el-input
                v-model="dialogData.statusName"
                style="width:178px;"
                :disabled="true"
              ></el-input> -->
            </el-form-item>
            <el-form-item label="温馨提示:">
              <p style="width:100%;color:red">
                本页面调整供应量、起售量、售价不影响商品状态，无需二次审核。
                如需要修改其他条件，需要二次审核，<span style="color:#39B54B"
                  >点击此处前往发布页面修改</span
                >
              </p>
            </el-form-item>
            <el-form-item v-if="dialogIsFind" style="margin-top:20px;">
              <el-button @click="findGoto">去修改</el-button>
            </el-form-item>
            <el-form-item v-else style="margin-top:20px;">
              <el-button @click="saveEdit">保存修改</el-button>
              <el-button @click="close">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
// import FormVue from "@/components/form";
import { reqAddsupply, reqsupplyTypeList } from "@/api/userInfo";
export default {
  components: {
    // FormVue
  },
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    },
    dialogData: {
      type: Object,
      default: () => {}
    },
    isFind: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog_flag: false,
      dialogIsFind: false,
      formConfig: {
        itemMargin: "28px",
        labelWidth: "70px"
      },
      formData: {
        // auditDate: "2020-08-19 10:31:39",
        // contactNumber: "15670191611",
        // contactPerson: "刚刚",
        // createDate: "2020-08-19 10:00:38",
        // disclosePriceName: "电议",
        // id: "70d74d59-64a2-465d-91f8-ad9b8a2d528f",
        // invoiceName: null,
        // isDel: 0,
        // isDisclosePrice: "power_conference",
        // isInvoice: null,
        // isSample: "have",
        // isSampleName: "有",
        // medicincePic:
        //   "http://192.168.1.187/group1/M00/00/05/wKgBu188h7uAQxx8AAJNoVEclmw697.jpg",
        // medicineId: "001",
        // medinceName: "黄芪",
        // orginCityName: "承德市",
        // orginCountyName: "双桥区",
        // orginProvinceName: "河北省",
        // originCityId: "130800",
        // originCountyId: "130802",
        // originProvinceId: "130000",
        // paymentMethod: "payment_to_delivery",
        // paymentMethodName: "款到发货",
        // price: null,
        // priceUnit: "",
        // priceUnitName: null,
        // qualificationStandard: "GMP",
        // qualificationStandardName: "GMP证书",
        // qualityStandard: "export_standard",
        // qualityStandardName: "达到出口标准",
        // specification: null,
        // specificationId: "xuanhuo",
        // specificationName: "选货",
        // startSaleAmount: 10,
        // startSaleUnit: "t",
        // startSaleUnitName: "吨",
        // status: 1,
        // statusName: "供应中",
        // supplyAmount: 10000,
        // supplyUnit: "t",
        // supplyUnitName: "吨",
        // updateDate: null,
        // updateUser: null,
        // userId: "member_4591313854671994890",
        // warehouseCityId: "110100",
        // warehouseCityName: "北京市",
        // warehouseCountyId: "110101",
        // warehouseCountyName: "东城区",
        // warehouseProvinceId: "110000",
        // warehouseProvinceName: "北京市",
        // yxq: "剩余30天"
      },
      formTypeList: {
        重量单位: [],
        售价方式: [],
        票据方式: [],
        质量标准: [],
        资质标准: [],
        有无: [],
        付款方式: [],
        药品规格: []
      }
    };
  },
  watch: {
    dialogFlag(newVal) {
      this.dialog_flag = newVal;
    },
    isFind(newVal) {
      this.dialogIsFind = newVal;
    }
  },
  created() {},
  methods: {
    close() {
      this.$emit("update:dialogFlag", false);
      this.$emit("update:isFind", false);
    },
    openDialog() {
      let dialogData = this.dialogData;
      this.formData = this.dialogData;
      console.log(dialogData);
      this.getTypelist();
    },
    // 获取各种类型下拉
    getTypelist() {
      for (let key in this.formTypeList) {
        let params = {};
        params.categoryName = key;
        reqsupplyTypeList(params).then(res => {
          this.formTypeList[key] = res.data.data;
          this.formTypeList[key].forEach(item => {
            item.label = item.name;
          });
        });
      }
    },
    /* 保存修改 */
    saveEdit() {
      let saveEditParams = JSON.parse(JSON.stringify(this.formData));
      reqAddsupply(saveEditParams).then(res => {
        this.$message.success(res.data.msg);
        this.$emit("update:dialogFlag", false);
        this.$emit("refresData");
      });
    },
    /* 查看跳转修改 */
    findGoto() {
      console.log(123);
      if (this.dialogData.statusName === "供应中") {
        this.$emit("update:isFind", false);
      } else if (
        this.dialogData.statusName !== "供应中" &&
        this.dialogData.statusName !== "审核中"
      ) {
        this.$emit("update:dialogFlag", false);
        this.$emit("update:isFind", false);
        this.$router.push({
          path: "/personal/supply/addsupply",
          query: this.dialogData
        });
      }
    }
  }
};
</script>
<style lang="scss">
.supplyDialog {
  .el-dialog {
    width: 60%;
    ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #333333 !important;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #333333 !important;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #333333 !important;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #333333 !important;
    }
    .el-form {
      padding: 20px;
      .el-form-item {
        margin-bottom: 10px !important;
        // border: 1px solid red;
        .el-input .el-input__inner {
          height: 30px;
        }
        .el-input.is-disabled .el-input__inner {
          background: transparent !important;
          border: 0 !important;
          color: #333333;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.supplyDialog {
  .el-form {
    .el-form-item {
      .el-input.is-disabled .el-input__inner {
        background: transparent;
      }
      .el-button {
        width: 158px;
        height: 34px;
        background: $sencondcolor;
        border: 1px solid $sencondcolor;
        border-radius: 5px;
        color: #fff;
        line-height: 0;
        &:first-child {
          background: rgba(57, 181, 75, 1);
          border: 1px solid $maincolor;
        }
      }
    }
  }
}
</style>
