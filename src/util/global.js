import { MessageBox, Message } from "element-ui";
export default {
  install(Vue) {
    Vue.prototype.confirm = params => {
      console.log("global");
      MessageBox.confirm(params.content, params.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning",
        center: true
      })
        .then(() => {
          params.fn && params.fn();
          console.log(params.status);
          Message.success(params.status || "删除成功");
        })
        .catch(() => {
          params.failfn && params.failfn();
          Message.info("已取消删除");
        });
    };
  }
};
