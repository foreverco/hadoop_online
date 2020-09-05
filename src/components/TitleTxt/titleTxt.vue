<template>
  <div class="titleTxt">
    <span class="titleSpan">
      {{ titleTxt }}
    </span>
    <span
      class="btnSpan"
      v-if="btnShow"
      @click="titleClick"
      :style="{ color: btnColor }"
    >
      {{ btnMsg }}
    </span>
  </div>
</template>
<script>
export default {
  name: "titleTxt",
  props: {
    titleTxt: {
      type: String,
      default: () => ""
    },
    btnShow: {
      type: Boolean,
      default: true
    },
    btnMsg: {
      type: String,
      default: "更多 > >"
    },
    btnColor: {
      type: String,
      default: "#3ab54c"
    }
  },
  methods: {
    titleClick() {
      this.$emit("titleClick");
    }
  }
};
</script>
<style lang="scss" scoped>
.titleTxt {
  // border: 1px solid red;
  // margin-bottom: 10px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .titleSpan {
    font-size: $titlesize;
    color: $maincolor;
    font-weight: 700;
    // border: 3px solid red;
    // border: 4px solid transparent;
    border-left: 4px solid $maincolor;
    display: flex;
    align-items: center;
    // padding-top: -2px;
    // padding-bottom: -2px;
    padding-left: 8px;
    letter-spacing: 4px;
  }
  .btnSpan {
    // color: $maincolor;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
