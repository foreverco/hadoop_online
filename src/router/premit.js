import router from "./index";
import store from "@/store";
import { getToken } from "../util/save";
import { getUsermsg } from "../util/storage";
import { Message } from "element-ui";
// import { userInfo } from "@/api/userInfo";
const routerList = router.options.routes[1].children;
const whiteRoutesObjs = routerList.filter(item => {
  return item.name === "Personal";
})[0].children;
const whiteRoutes = whiteRoutesObjs.map(item => item.path);
console.log(whiteRoutes);

router.beforeEach((to, from, next) => {
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;
  // safari
  window.pageYOffset = 0;
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
    // if (whiteRoutes.indexOf(to.path) === -1) {
    if (to.path.slice(0, 9) !== "/personal") {
      next();
    } else {
      Message.error("没有权限,登陆后访问该页面！");
      next("/login");
    }
  }
});
