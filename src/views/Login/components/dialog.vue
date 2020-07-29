<template>
  <div>
    <el-dialog title="123" :visible.sync="dialog_flag">
      123
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "ForgetPass",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    flag(newVal) {
      this.dialog_flag = newVal;
    }
  },
  data() {
    return {
      dialog_flag: false
    };
  }
};
</script>
<style lang="scss"></style>
