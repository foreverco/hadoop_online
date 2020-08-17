<template>
  <div class="supplyDialog">
    {{ drugList }}
    <FormVue
      ref="addsupplyForm"
      :formData="formData"
      :formItem="formItem"
      :formHandle="formHandle"
      :formConfig="formConfig"
    ></FormVue>
  </div>
</template>
<script>
import FormVue from "@/components/form";
export default {
  components: {
    FormVue
  },
  computed: {
    tokenMsg() {
      return this.$store.state.config.drugList;
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
          type: "Select",
          label: "药材品名",
          placeholder: "请输入药材品名",
          prop: "medinceName",
          width: "380px",
          options: [
            {
              value: 1,
              label: "黄芪"
            },
            {
              value: 2,
              label: "板蓝根"
            }
          ],
          required: true
        },
        {
          type: "Select",
          label: "规格",
          placeholder: "请输入药材规格",
          prop: "medinceName",
          width: "380px",
          options: [
            {
              value: 1,
              label: "统货1"
            },
            {
              value: 2,
              label: "统货2"
            }
          ],
          required: true
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped></style>
