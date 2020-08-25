<template>
  <div>
    <el-form
      :model="formData"
      ref="form"
      label-position="right"
      :label-width="formConfig.labelWidth"
    >
      <template v-for="item in formItem">
        <el-form-item
          :key="item.prop"
          :label="item.label"
          :prop="item.prop"
          :rules="item.rules"
          v-if="!item.ishide"
          :style="{ marginTop: formConfig.itemMargin }"
        >
          <!-- Input -->
          <el-input
            v-if="item.type == 'Input'"
            :placeholder="item.placeholder"
            v-model.trim="formData[item.prop]"
            :disabled="item.disable"
            :style="{ width: item.width }"
          >
            <template v-if="item.slot" slot="append">{{ item.slot }}</template>
            <el-select
              v-if="item.selslot"
              v-model="formData[item.selProp]"
              slot="append"
              :placeholder="item.selPlaceHolder"
              style="width: 75px;"
            >
              <el-option
                v-for="i in item.selslotOptions"
                :key="i.value"
                :label="i.label"
                :value="i.value"
              >
              </el-option>
            </el-select>
          </el-input>
          <!-- 省市区 -->
          <slot v-if="item.type == 'Slot'" :name="item.slotName"></slot>
          <!-- Radio -->
          <el-radio-group
            v-if="item.type == 'Radio'"
            v-model="formData[item.prop]"
          >
            <el-radio
              v-for="(i, index) in item.options"
              :key="index"
              :label="i.value"
              :style="{ width: item.width }"
              >{{ i.label }}</el-radio
            >
          </el-radio-group>
          <!-- 下拉框 -->
          <el-select
            v-if="item.type == 'Select'"
            v-model="formData[item.prop]"
            placeholder="请选择"
            filterable
            :style="{ width: item.width }"
          >
            <el-option
              v-for="i in item.options"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            >
            </el-option>
          </el-select>
          <!-- 时间控件 -->
          <el-date-picker
            v-if="item.type == 'Date'"
            v-model="formData[item.prop]"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期时间"
            :style="{ width: item.width }"
          >
          </el-date-picker>
          <!-- 时间控件 -->
          <el-date-picker
            v-if="item.type == 'DataPick'"
            v-model="formData[item.prop]"
            type="datetime"
            placeholder="选择日期时间"
            :style="{ width: item.width }"
          >
          </el-date-picker>
          <!-- 按钮 -->
        </el-form-item>
      </template>

      <el-form-item style="margin-top:30px;">
        <el-button
          :type="item.type"
          v-for="(item, index) in formHandle"
          :key="index"
          :style="{ width: item.width }"
          @click="item.handler && item.handler()"
          >{{ item.label }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "formVue",
  components: {},
  props: {
    formData: {
      type: Object,
      default: () => {}
    },
    formConfig: {
      type: Object,
      default: () => {
        return {
          itemMargin: "0px",
          labelWidth: "120px"
        };
      }
    },
    formItem: {
      type: Array,
      default: () => []
    },
    formHandle: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {},
      typeMsg: {
        Input: "请输入",
        Radio: "请选择",
        Select: "请选择",
        DataPick: "请选择",
        Slot: "请选择"
      }
    };
  },
  methods: {
    initFormData() {
      this.formItem.forEach(item => {
        // rules规则
        if (item.required) {
          this.rules(item);
        }
        // 自定义规则
        if (item.validator) {
          item.rules = item.validator;
        }
      });
    },
    rules(item) {
      // console.log(item);
      // 是否存在必填规则
      const requiredRules = [
        {
          required: true,
          message:
            item.requiredMsg || `${this.typeMsg[item.type]}${item.label}`,
          trigger: "change"
        }
      ];
      // 其他规则
      if (item.rules && item.rules.length > 0) {
        item.rules = requiredRules.concat(item.rules);
      } else {
        item.rules = requiredRules;
      }
    }
  },
  watch: {
    formItem: {
      handler(newVal) {
        // alert(123);
        console.log(newVal);
        this.initFormData();
      },
      // 初始化监听
      immediate: true,
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form {
  width: 100%;
}
</style>
