<template>
  <div class="SurveyAdd">
    <FormVue
      ref="vueForm"
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
          style="width:50%"
        ></CascaderVue>
      </template>
    </FormVue>
    <!-- <el-form
      :rules="cerifyRules"
      :model="cerifyForm"
      ref="cerifyForm"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="药材名称">
        <el-select v-model="value" placeholder="请选择" style="width:50%">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="种植面积">
        <el-input style="width:50%">
          <template slot="append">亩</template>
        </el-input>
      </el-form-item>
      <el-form-item label="种植时间">
        <el-date-picker
          v-model="value1"
          type="datetime"
          placeholder="选择日期时间"
          style="width:50%"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="采收时间">
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="选择日期时间"
          style="width:50%"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="种植面积">
        <el-input style="width:50%">
          <template slot="append">公斤/亩</template>
        </el-input>
      </el-form-item>
      <el-form-item label="地理位置">
        <CascaderVue
          :areaValue.sync="area"
          ref="cascader"
          :areaConfig="{ mapLocation: false }"
          style="width:50%"
        ></CascaderVue>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="请输入详细地址" style="width:50%"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success">保存</el-button>
      </el-form-item>
    </el-form> -->
  </div>
</template>
<script>
import CascaderVue from "@/components/Cascader";
import FormVue from "@/components/form";
import { reqAddsurvery } from "@/api/userInfo";
export default {
  name: "SurveyAdd",
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
        // 药材名称
        medicineName: "",
        // 种植面积
        plantArea: "",
        // 种植时间
        plantDate: "",
        // 采收时间
        harvestDate: "",
        // 预估亩产
        yieldMu: "",
        city: [],
        // 详细地址
        address: ""
      },
      // 表单配置
      formConfig: {
        itemMargin: "28px",
        labelWidth: "120px"
      },
      formItem: [
        {
          type: "Input",
          label: "药材名称",
          prop: "medicineName",
          required: true,
          width: "50%"
        },
        {
          type: "Input",
          label: "种植面积",
          placeholder: "请输入种植面积",
          prop: "plantArea",
          width: "50%",

          slot: "亩",
          validator: [{ validator: validateNumber, trigger: "change" }]
        },
        {
          type: "Date",
          label: "种植时间",
          placeholder: "请选择种植时间",
          prop: "plantDate",
          required: true,
          width: "50%",
          margin: "28px"
        },
        {
          type: "Date",
          label: "采收时间",
          placeholder: "请选择采收时间",
          prop: "harvestDate",
          required: true,
          width: "50%",
          margin: "28px"
        },
        {
          type: "Input",
          label: "预估亩产",
          placeholder: "请输入预估亩产",
          prop: "yieldMu",
          validator: [{ validator: validateNumber, trigger: "change" }],
          // rules: [
          //   {
          //     min: 3,
          //     max: 5,
          //     message: "长度在 3 到 5 个字符",
          //     trigger: "change"
          //   }
          // ],
          width: "50%",

          slot: "公斤/亩"
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
          prop: "address",
          width: "50%",
          margin: "28px"
        }
        // {
        //   type: "Radio",
        //   label: "性别",
        //   prop: "type",
        //   options: this.$store.state.config.sex_json,
        //   required: true,
        //   width: "50%",
        //   margin: "28px"
        // }
      ],
      formHandle: [
        {
          label: "确定",
          type: "success",
          width: "170px",
          handler: () => this.formValidate()
        }
      ]

      // options: [
      //   {
      //     value: "选项1",
      //     label: "黄金糕"
      //   },
      //   {
      //     value: "选项2",
      //     label: "双皮奶"
      //   },
      //   {
      //     value: "选项3",
      //     label: "蚵仔煎"
      //   },
      //   {
      //     value: "选项4",
      //     label: "龙须面"
      //   },
      //   {
      //     value: "选项5",
      //     label: "北京烤鸭"
      //   }
      // ],
      // value: "",
      // value1: "",
      // value2: "",
      // area: []
    };
  },
  mounted() {
    this.getUserMsg();
  },
  methods: {
    getUserMsg() {
      this.$refs.cascader.initPlaceHodler("省/市/区");
    },
    formValidate() {
      this.$refs.vueForm.$refs.form.validate(valid => {
        if (valid) {
          alert("submit!");
          console.log(this.formData);
          let surveyParams = JSON.parse(JSON.stringify(this.formData));
          surveyParams.provinceId = this.formData.city[0];
          surveyParams.cityId = this.formData.city[1];
          surveyParams.countyId = this.formData.city[2];
          reqAddsurvery(surveyParams).then(res => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.SurveyAdd {
  .el-form {
    margin-top: 30px;
    border: 1px solid red;
    .el-form-item {
      margin: 28px 0;
      .el-button {
        width: 170px;
      }
    }
  }
}
</style>
