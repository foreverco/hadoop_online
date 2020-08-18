<template>
  <div class="supplyDialog">
    <el-dialog @close="close" :visible.sync="dialog_flag" title="系统消息">
      <FormVue
        ref="addsupplyForm"
        :formData="formData"
        :formItem="formItem"
        :formHandle="formHandle"
        :formConfig="formConfig"
      ></FormVue>
    </el-dialog>
  </div>
</template>
<script>
import FormVue from "@/components/form";
export default {
  components: {
    FormVue
  },
  props: {
    dialogFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog_flag: false,
      formConfig: {
        itemMargin: "28px",
        labelWidth: "70px"
      },
      formData: {},
      formItem: [
        {
          type: "Input",
          label: "药材品名",
          placeholder: "请输入药材品名",
          prop: "recipientName",
          width: "380px",
          required: true
        }
      ],
      formHandle: []
    };
  },
  watch: {
    dialogFlag(newVal) {
      this.dialog_flag = newVal;
    }
  },
  methods: {
    close() {
      this.$emit("update:dialogFlag", false);
    }
  }
};
</script>
<style lang="scss" scoped></style>
