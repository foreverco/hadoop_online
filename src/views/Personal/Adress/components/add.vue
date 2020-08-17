<template>
  <div class="addAdress">
    <FormVue
      ref="addAdressForm"
      class="perCenterForm"
      :formData="formData"
      :formItem="formItem"
      :formHandle="formHandle"
      :formConfig="formConfig"
    >
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
import FormVue from "@/components/form";
import CascaderVue from "@/components/Cascader";
import { validatePhone } from "@/util/validate";
import { reqaddAdress } from "@/api/adress";
export default {
  name: "addAddress",
  components: {
    FormVue,
    CascaderVue
  },
  data() {
    let validatePhoneNum = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else if (validatePhone(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      // 表单提交数据
      formData: {
        // 省市区
        city: [],
        provinceName: "",
        cityName: "",
        countyName: "",
        // 收件人姓名
        recipientName: "",
        // 收件人手机号
        recipientTel: "",
        // 详细地址
        address: "",
        // 邮编
        postcode: "",
        // 是否是默认地址,1是默认地址
        isDefault: 0,
        // 省ID
        provinceId: "",
        // 市ID
        cityId: "",
        // 区ID
        countyId: ""
      },
      // 表单配置
      formConfig: {
        itemMargin: "28px",
        labelWidth: "70px"
      },
      // 表单内容数据
      formItem: [
        {
          type: "Input",
          label: "姓名",
          placeholder: "请输入姓名",
          prop: "recipientName",
          width: "380px",
          required: true
        },
        {
          type: "Input",
          label: "手机号",
          placeholder: "请输入手机号",
          prop: "recipientTel",
          width: "380px",
          validator: [{ validator: validatePhoneNum, trigger: "change" }]
        },
        {
          type: "Slot",
          slotName: "city",
          prop: "city",
          required: true,
          label: "地址"
        },
        {
          type: "Input",
          label: "详细地址",
          required: true,
          placeholder: "请输入详细地址",
          prop: "address",
          width: "380px"
        },
        {
          type: "Input",
          label: "邮编",
          placeholder: "请输入邮编",
          prop: "postcode",
          width: "380px",
          required: true
        },
        {
          type: "Radio",
          label: "",
          prop: "isDefault",
          options: [
            { value: 1, label: "设为默认地址" },
            { value: 0, label: "不设为默认地址" }
          ],
          width: "150px"
        }
      ],
      formHandle: [
        {
          label: "保存",
          type: "success",
          width: "170px",
          handler: () => this.addAdress()
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
    this.initFormData();
  },
  mounted() {
    if (this.formData.provinceName) {
      this.getAdressCh(
        `${this.formData.provinceName}/${this.formData.cityName}/${this.formData.countyName}`
      );
    }
  },
  methods: {
    initFormData() {
      console.log(this.$route.query);
      if (this.$route.query.id) {
        for (let key in this.formData) {
          this.formData[key] = this.$route.query[key];
        }
        this.formData.id = this.$route.query.id;
        this.formData.isDefault = Number(this.$route.query.isDefault);
        console.log(this.formData);
        this.formData.city = [];
        this.formData.city.push(
          this.$route.query.provinceId,
          this.$route.query.cityId,
          this.$route.query.countyId
        );
      }
    },
    addAdress() {
      this.$refs.addAdressForm.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.formData);
          let addressParams = {};
          addressParams = JSON.parse(JSON.stringify(this.formData));
          addressParams.provinceId = this.formData.city[0];
          addressParams.cityId = this.formData.city[1];
          addressParams.countyId = this.formData.city[2];
          // addressParams.countyName = this.formData.countyName;
          reqaddAdress(addressParams).then(res => {
            console.log(res);
            this.$router.push({
              path: "/personal/adress/list"
            });
          });
        }
      });
    },
    changeAdd() {
      this.$router.push({
        path: "/personal/adress/list"
      });
    },
    callbackComponents(params) {
      if (params.function) {
        this[params.function](params.data.adress);
      }
    },
    adressShow(data) {
      this.formData.countyName = data;
      this.formData.countyName = 123;
      console.log(this.formData.countyName);
    },
    getAdressCh(e) {
      this.$refs.cascader.initPlaceHodler(e);
    }
  }
};
</script>
<style lang="scss">
.addAdress {
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
</style>
<style lang="scss" scoped></style>
