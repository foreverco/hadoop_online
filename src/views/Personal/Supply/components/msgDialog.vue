<template>
  <div class="msgDialog">
    <el-dialog
      @close="close"
      :visible.sync="dialog_flag"
      title="系统消息"
      @opened="openDialog"
    >
      <div class="topMsg">
        <p>
          <i class="el-icon-message-solid"></i>
          <span>
            尊敬的用户,您好
          </span>
        </p>
        <p>
          由于您没有实名认证，目前无法发布供应信息
        </p>
      </div>
      <div class="botMsg">
        <p>
          <i class="el-icon-message-solid"></i>
          <span>
            温馨提示
          </span>
        </p>
        <p>
          立即完成实名认证，解锁更多功能
        </p>
        <p>
          <el-button @click="gotocertify" type="success">立即前往</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "msgDialog",
  props: {
    msgDialog: {
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
    msgDialog(newVal) {
      this.dialog_flag = newVal;
    }
  },
  methods: {
    close() {
      this.$emit("update:msgDialog", false);
    },
    openDialog() {
      console.log(123);
    },
    gotocertify() {
      this.$router.push({
        path: "/personal/certify"
      });
    }
  }
};
</script>
<style lang="scss">
.msgDialog {
  .el-dialog {
    width: 30%;
  }
}
</style>
<style lang="scss" scoped>
.msgDialog {
  .el-dialog {
    width: 30%;
    .topMsg {
      // padding: 22px 0;
      border-bottom: 1px solid #00000010;
      p {
        margin: 15px 0;
        &:first-child {
          i {
            color: $maincolor;
          }
        }
        &:nth-child(2) {
          margin-left: 25px;
        }
      }
    }
    .botMsg {
      // padding: 22px 0;
      p {
        margin: 15px 0;
        &:first-child {
          i {
            color: #da2f2f;
          }
          span {
            color: #da2f2f;
          }
        }
        &:nth-child(2) {
          margin-left: 25px;
        }
        &:last-child {
          margin-left: 25px;
        }
      }
    }
  }
}
</style>
