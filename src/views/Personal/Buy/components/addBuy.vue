<template>
  <div class="supplyDialog">
    <FormVue
      ref="addsupplyForm"
      :formData="formData"
      :formItem="formItem"
      :formHandle="formHandle"
      :formConfig="formConfig"
    >
      <template v-slot:drugcd="slotData">
        <p v-if="false">{{ slotData }}</p>
        <CascaderVue
          :areaValue.sync="formData.drugcd"
          ref="cascadercd"
          :areaConfig="{ mapLocation: false }"
          @callback="callbackdrugcd"
          style="width:70%"
        ></CascaderVue>
      </template>
      <template v-slot:drugck="slotData">
        <p v-if="false">{{ slotData }}</p>
        <CascaderVue
          :areaValue.sync="formData.drugck"
          ref="cascaderck"
          :areaConfig="{ mapLocation: false }"
          @callback="callbackdrugck"
          style="width:70%"
        ></CascaderVue>
      </template>
      <template v-slot:upload="slotData">
        <p v-if="false">{{ slotData }}</p>
        <per-upload
          class="avatar-uploader"
          :limit="1"
          action="/media/file/upload"
          :show-file-list="false"
          cropper
          :cropperOption="{
            fixedBox: true
          }"
          :on-success="picMethod"
          :before-upload="beforeAvatarUpload"
          style="{border:1px solid blue}"
        >
          <img
            v-if="formData.medicincePic"
            :src="formData.medicincePic"
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
        </per-upload>
      </template>
    </FormVue>
  </div>
</template>
<script>
import FormVue from "@/components/form";
import CascaderVue from "@/components/Cascader";
import { mapActions } from "vuex";
import { reqsupplyTypeList } from "@/api/userInfo";
import { reqAddbuy } from "@/api/buy";
import { validatePhone } from "@/util/validate";
import { setApplyForm, getApplyForm } from "@/util/storage";
export default {
  components: {
    FormVue,
    CascaderVue
  },
  computed: {
    status() {
      return this.$store.state.config.status;
    },
    formItem() {
      let validatePhoneNum = (rule, value, callback) => {
        if (!value) {
          callback(new Error("请输入手机号"));
        } else if (validatePhone(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      };

      return [
        {
          type: "Select",
          label: "药材品名:",
          placeholder: "请输入药材品名",
          prop: "medicineId",
          width: "380px",
          options: this.$store.state.config.drugList,
          required: true
        },
        {
          type: "Select",
          label: "规格:",
          placeholder: "请输入药材规格",
          prop: "specificationId",
          width: "380px",
          options: this.formTypeList["药品规格"],
          required: true
        },
        {
          type: "Input",
          label: "求购量:",
          placeholder: "请输入供应量",
          selPlaceHolder: "单位",
          prop: "buyingAmount",
          width: "380px",
          selslot: true,
          selProp: "buyingUnit",
          selslotOptions: this.formTypeList["重量单位"],
          required: true
        },
        {
          type: "Select",
          label: "所需票据:",
          placeholder: "所需票据",
          prop: "requiredBills",
          width: "380px",
          options: this.formTypeList["票据方式"],
          required: true
        },
        {
          type: "Slot",
          slotName: "drugcd",
          prop: "drugcd",
          required: true,
          // validator: [{ validator: validateCity, trigger: "change" }],
          label: "药材产地:"
        },
        {
          type: "Slot",
          slotName: "drugck",
          prop: "drugck",
          required: true,
          label: "交货地点:"
        },
        {
          type: "DataPick",
          label: "截至日期:",
          placeholder: "请选择截至日期",
          prop: "deadline",
          width: "380px",
          required: true
        },
        {
          type: "Select",
          label: "质量标准:",
          placeholder: "请选择质量标准",
          prop: "qualityStandard",
          width: "380px",
          options: this.formTypeList["质量标准"],
          required: true
        },
        {
          type: "Select",
          label: "资质标准:",
          placeholder: "请选择资质标准",
          prop: "qualificationStandard",
          width: "380px",
          options: this.formTypeList["资质标准"],
          required: true
        },
        {
          type: "Select",
          label: "有无样品:",
          placeholder: "请选择资质标准",
          prop: "isSample",
          width: "380px",
          options: this.formTypeList["有无"],
          required: true
        },
        {
          type: "Select",
          label: "付款方式:",
          placeholder: "请选择资质标准",
          prop: "paymentMethod",
          width: "380px",
          options: this.formTypeList["付款方式"],
          required: true
        },
        {
          type: "Select",
          label: "包装要求:",
          placeholder: "请选择资质标准",
          prop: "packageRequirements",
          width: "380px",
          options: this.formTypeList["包装要求"],
          required: true
        },
        {
          type: "Select",
          label: "图片选择:",
          placeholder: "图片选择",
          prop: "picIsdefault",
          width: "380px",
          options: [
            { label: "默认图例", value: 1 },
            { label: "自定义上传", value: 0 }
          ],
          required: true
        },
        {
          type: "Slot",
          slotName: "upload",
          prop: "medicincePic",
          required: true,
          label: "图片上传:"
        },
        {
          type: "Input",
          label: "联系人:",
          placeholder: "请输入联系人",
          prop: "contactPerson",
          width: "380px",
          required: true
        },
        {
          type: "Input",
          label: "联系电话:",
          placeholder: "请输入联系电话",
          prop: "contactNumber",
          width: "380px",
          validator: [{ validator: validatePhoneNum, trigger: "change" }]
        }
      ];
    }
  },
  watch: {
    status: {
      handler(newVal) {
        console.log(newVal);
        setApplyForm(this.formData);
        this.$router.push("/personal/supply/tableView");
      },
      deep: true
    }
  },
  data() {
    return {
      dialog_flag: false,
      formTypeList: {
        重量单位: [],
        售价方式: [],
        票据方式: [],
        质量标准: [],
        资质标准: [],
        有无: [],
        付款方式: [],
        药品规格: [],
        包装要求: []
      },
      formConfig: {
        itemMargin: "28px",
        labelWidth: "100px"
      },
      formData: {
        // 药材产地
        drugcd: [],
        // 药材仓库
        drugck: [],
        //药材品名
        medicineId: "",
        // 规格
        specificationId: "",
        // 求购量
        buyingAmount: "",
        // 求购量单位
        buyingUnit: "",

        // 所需票据
        requiredBills: "",
        //质量标准
        qualityStandard: "",
        //截至日期
        deadline: "",
        //资质标准
        qualificationStandard: "",
        //有无样品
        isSample: "",
        // 付款方式
        paymentMethod: "",
        // 包装要求
        packageRequirements: "",
        //图片选择
        picIsdefault: 1,
        // 图片地址
        medicincePic: "",
        //联系人
        contactPerson: "",
        // 联系电话
        contactNumber: ""
      },
      formHandle: [
        {
          label: "保存",
          type: "success",
          width: "170px",
          handler: () => this.addSupply()
        },
        {
          label: "取消",
          type: "success",
          width: "170px",
          handler: () => this.changeAdd()
        }
      ]
    };
  },
  created() {
    this.getDruglist();
    this.getTypelist();
    // this.formItem[0].options = this.$store.state.config.drugList;
    if (getApplyForm()) {
      this.formData = JSON.parse(getApplyForm());
    }
    if (this.$route.query && this.$route.query.id) {
      this.formData = this.$route.query;
      // for (let key in this.formData) {
      //   this.formData[key] = this.$route.query[key];
      // }
      // this.formData.id = this.$route.query.id;
      // 药材产地
      this.formData.drugcd = [];
      this.formData.drugcd.push(
        this.$route.query.originProvinceId,
        this.$route.query.originCityId,
        this.$route.query.originCountyId
      );
      // // 药材收货
      this.formData.drugck = [];
      this.formData.drugck.push(
        this.$route.query.deliveryProvinceId,
        this.$route.query.deliveryCityId,
        this.$route.query.deliveryCountyId
      );
    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.id) {
      let params = this.$route.query;
      let cdName = `${params.orginProvinceName}/${params.orginCityName}/${params.orginCountyName}`;
      let ckName = `${params.deliveryProvinceName}/${params.deliveryCityName}/${params.deliveryCountyName}`;
      this.getAdressCh("cascadercd", cdName);
      this.getAdressCh("cascaderck", ckName);
    }
  },
  methods: {
    // 获取用户类型
    ...mapActions(["getDruglist"]),
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
      // this.formTypeList.forEach(item => {
      //   let params = {};
      //   // params.categoryItemsName = "";
      //   params.categoryName = item.name;
      //   reqsupplyTypeList(params).then(res => {
      //     console.log(res);
      //   });
      // });
    },
    // 提交保存
    addSupply() {
      this.$refs.addsupplyForm.$refs.form.validate(valid => {
        if (valid) {
          let supplyParams = JSON.parse(JSON.stringify(this.formData));
          // 获取产地code
          supplyParams.originProvinceId = this.formData.drugcd[0];
          supplyParams.originCityId = this.formData.drugcd[1];
          supplyParams.originCountyId = this.formData.drugcd[2];
          // 获取收货code
          supplyParams.deliveryProvinceId = this.formData.drugck[0];
          supplyParams.deliveryCityId = this.formData.drugck[1];
          supplyParams.deliveryCountyId = this.formData.drugck[2];
          reqAddbuy(supplyParams).then(res => {
            console.log(res);
            this.$router.push({
              path: "/personal/buy/tableView"
            });
          });
          // edituserInfo(userFormParams).then(res => {
          //   console.log(res);
          //   this.$message.success(res.data.msg);
          //   this.getUserMsg();
          // });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 取消添加
    changeAdd() {
      this.$router.push({
        path: "/personal/supply/tableView"
      });
    },
    callbackdrugcd(params) {
      if (params.function) {
        this[params.function](params.data.adress);
      }
    },
    adressShow(data) {
      this.formData.address = data;
      console.log(this.formData.address);
    },
    callbackdrugck(params) {
      if (params.function) {
        this[params.function](params.data.adress);
      }
    },
    /* 初始化地址 */
    getAdressCh(name, e) {
      console.log(this.$refs[name]);
      console.log(e);
      this.$refs[name].initPlaceHodler(e);
    },
    // 图片上传
    picMethod(res) {
      if (res.code == 200) {
        this.formData.medicincePic = res.data;
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
<style lang="scss" scoped></style>
