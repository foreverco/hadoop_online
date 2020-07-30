import router from "./index";
import store from "@/store";
import { getToken, getUsermsg } from "../util/save";
// import { userInfo } from "@/api/userInfo";

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = "大数据分析平台-" + to.meta.title;
  }
  console.log(from);
  // console.log(to);
  let token = getToken();
  let usernmsg = getUsermsg();

  if (getToken()) {
    store.commit("app/RECORD_TOKEN", token);
    store.commit("app/RECORD_USERINFO", usernmsg);
    if (to.path === "/login") {
      next("/home");
    } else {
      next();
    }
    /* 路由动态添加 每个角色分配不同菜单 */
  } else {
    next();
  }
});
