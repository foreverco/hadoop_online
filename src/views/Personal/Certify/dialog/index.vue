<template>
  <div class="certifyDialog">
    <el-dialog @close="close" :visible.sync="dialog_flag" title="系统消息">
      <div class="diaMsg">
        <p>
          <i class="el-icon-message-solid"></i>
          <span>审核通知</span>
          <span>9:05</span>
        </p>
        <p>
          您的申请正在审核中，审核结果会以短信的方式发送到您的手机，请保持手机畅通
        </p>
      </div>
      <div class="diaMsg">
        <p>
          <i class="el-icon-info"></i>
          <span>温馨提示</span>
        </p>
        <p>
          完成用户调查后可以在交易市场优先展示您的供求信息
        </p>
      </div>
      <div class="diaMsg">
        <el-button type="success" @click="goto">立即前往</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "cerifyDialog",
  props: {
    flag: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      dialog_flag: false
    };
  },
  watch: {
    flag(newVal) {
      this.dialog_flag = newVal;
    }
  },
  methods: {
    close() {
      this.$emit("update:flag", false);
    },
    goto() {
      this.$router.push({ name: "Survey" });
    }
  }
};
</script>
<style lang="scss">
.certifyDialog {
  .el-dialog {
    width: 542px;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    .el-dialog__headerbtn .el-dialog__close {
      color: #f5fff6;
      border: 1px solid #f5fff6;
      border-radius: 100%;
      padding: 2px;
    }
    // height: 247px;
    .diaMsg {
      // border: 1px solid red;
      &:first-child {
        border-bottom: 1px solid #00000010;
        p {
          i {
            color: $maincolor;
          }
          span {
            color: #333333;
            &:last-child {
              float: right;
            }
          }
        }
      }
      p {
        margin: 5px 0;
        line-height: 30px;
        &:last-child {
          margin-left: 15px;
        }
        i {
          margin-right: 10px;
          color: #da2f2f;
        }
        span {
          color: #da2f2f;
        }
      }
      .el-button {
        margin-left: 15px;
      }
    }
  }
}
</style>
<style lang="scss" scoped></style>
